class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xy = [x, y];
  }
}
class Vector {
  constructor(dx, dy) {
    this.dx = dx;
    this.dy = dy;
    this.dxdy = [dx, dy];
  }
}

class Platform {
  constructor(width, height, type, x, y) {
    this.platformHeightAndWidth = 96; // Automate this ??

    this.numberOfBlocksX = width;
    this.numberOfBlocksY = height;
    this.width = width * this.platformHeightAndWidth;
    this.height = height * this.platformHeightAndWidth;

    this.type = type;
    this.position = new Point(x, y);
    // X and Y pos are the top left corner of the platform

    this.PointA = this.position;
    this.PointB = new Point(this.position.x + this.width + 80, this.position.y);
    this.PointC = new Point(this.position.x, this.position.y + this.height);
    this.PointD = new Point(
      this.position.x + this.width + 80,
      this.position.y + this.height
    );
  }

  assingFramePlatformParams(framePlatformDiv, postion, width, height) {
    framePlatformDiv.className = "platform";
    framePlatformDiv.style.display = "flex";
    framePlatformDiv.style.position = "absolute";
    framePlatformDiv.style.left = `${postion.x}px`;
    framePlatformDiv.style.top = `${postion.y}px`;
    framePlatformDiv.style.width = `${width}px`;
    framePlatformDiv.style.height = `${height}px`;
    framePlatformDiv.style.zIndex = 10;
  }
  assingChildPlatformParams(childPlatformDiv, platformImg, width, height) {
    childPlatformDiv.className = "childPlatform";
    childPlatformDiv.style.backgroundImage = platformImg;
    childPlatformDiv.style.backgroundSize = "cover";
    childPlatformDiv.style.width = `${width}px`;
    childPlatformDiv.style.height = `${height}px`;
  }

  CreatePlatform() {
    const framePlatformDiv = document.createElement("div");

    this.assingFramePlatformParams(
      framePlatformDiv,
      this.position,
      this.width,
      this.height
    );

    let platformType = "Unkown";
    for (
      let platformIndex = 0;
      platformIndex < this.numberOfBlocksX;
      platformIndex++
    ) {
      const childPlatformDiv = document.createElement("div");
      if (this.numberOfBlocksX == 1) {
        platformType = "Single";
      } else {
        if (platformIndex == 0) {
          platformType = "Left";
        } else if (platformIndex == this.numberOfBlocksX - 1) {
          platformType = "Right";
        } else {
          platformType = "Mid";
        }
      }
      let platformImg =
        "url(" + String.raw`img/128x128/GrassCliff` + platformType + ".png)";

      this.assingChildPlatformParams(
        childPlatformDiv,
        platformImg,
        this.platformHeightAndWidth,
        this.platformHeightAndWidth
      );
      framePlatformDiv.appendChild(childPlatformDiv);
    }
    // document.querySelector("#gameGui").appendChild(framePlatformDiv);
    document.body.appendChild(framePlatformDiv);
  }
}

class Player {
  constructor(startingPosX, startingPosY) {
    this.width = 73;
    this.height = 74;
    this.pace = new Vector(0.08, 3);
    this.gravity = 0.2;
    this.jumpPower = -10.0;
    this.maxVelocety = 5;
    this.friction = 0.1;

    this.startingPos = new Point(startingPosX, startingPosY);
    this.position = new Point(startingPosX, startingPosY);
    this.keys = [];
    this.velocety = new Vector(0, 0);
    this.jumping = false;
    this.onGround = false;
    this.canJump = true;

    this.UpdateHitbox();
  }

  UpdateHitbox() {
    this.PointA = this.position;
    this.PointB = new Point(this.position.x + this.width, this.position.y);
    this.PointC = new Point(this.position.x, this.position.y + this.height);
    this.PointD = new Point(
      this.position.x + this.width,
      this.position.y + this.height
    );
  }
  inheritPosition(player) {
    this.position = player.position;
    this.UpdateHitbox();
  }

  copy() {
    const copy = new Player(this.startingPos.x, this.startingPos.y);
    copy.inheritPosition(this);

    copy.keys = [...this.keys];
    copy.width = this.width;
    copy.height = this.height;

    return copy;
  }

  LoadPlayer(className) {
    this.playerDiv = document.createElement("div");

    this.playerDiv.style.backgroundImage =
      "url('img/characters/player/idle.png')";
    this.playerDiv.className = className;
    this.playerDiv.style.position = "absolute";
    this.playerDiv.style.left = `${this.startingPos.x}px`;
    this.playerDiv.style.top = `${this.startingPos.y}px`;
    this.playerDiv.style.zIndex = 11;
    this.playerDiv.style.width = `${this.width}px`;
    this.playerDiv.style.height = `${this.height}px`;

    document.body.appendChild(this.playerDiv);
    this.UpdateHitbox();
  }
  UnloadPlayer() {
    if (this.playerDiv && document.body.contains(this.playerDiv)) {
      document.body.removeChild(this.playerDiv);
    } else {
      console.warn("playerDiv does not exist or is not in the DOM.");
    }
  }

  InititatePlayerMovement() {
    document.addEventListener("keydown", (e) => {
      if (this.keys.indexOf(e.key) == -1) {
        this.keys.push(e.key);
      }
    });
    document.addEventListener("keyup", (e) => {
      let index = this.keys.indexOf(e.key);

      if (index > -1) {
        this.keys.splice(index, 1);

        if (
          this.keys.indexOf("ArrowRight") == -1 &&
          this.keys.indexOf("ArrowLeft") == -1 &&
          this.keys.indexOf("d") == -1 &&
          this.keys.indexOf("a") == -1
        ) {
          try {
            this.velocety.dx = 0;
            ghostPlayer.velocety.dx = 0;
          } catch (error) {
            console.error("Error: Velocity: ", error);
          }
        }
      }
    });
  }

  CheckForMovement(ghostPlayer) {
    debugConsole.textContent = this.velocety.dx;
    // console.log(this.velocety.dx);

    if (this.keys.indexOf("ArrowRight") != -1 || this.keys.indexOf("d") != -1) {
      this.move(this.pace.dx, 0, this, ghostPlayer);
    }
    if (this.keys.indexOf("ArrowLeft") != -1 || this.keys.indexOf("a") != -1) {
      this.move(-this.pace.dx, 0, this, ghostPlayer);
    }
    if (
      (this.keys.indexOf(" ") != -1 || this.keys.indexOf("w") != -1) &&
      this.onGround
    ) {
      this.velocety.dy = this.jumpPower;
      ghostPlayer.velocety.dy = ghostPlayer.jumpPower;
    }

    // console.log("ABS Velocety: " + Math.abs(this.velocety.dy));

    ghostPlayer.inheritPosition(this);

    let ghostCollisions = checkCollision(ghostPlayer, platforms);
    if (ghostCollisions.indexOf("Bottom") != -1) {
      this.onGround = true;
    } else {
      this.onGround = false;
    }

    if (this.onGround && this.velocety.dy > -0.5) {
      this.velocety.dy = 0;
    } else {
      this.velocety.dy += this.gravity;
    }
    if (ghostCollisions.indexOf("Top") != -1) {
      this.velocety.dy = this.velocety.dy * -0.7;
    }

    this.position.x += this.velocety.dx;
    this.position.y += this.velocety.dy;

    this.playerDiv.style.left = `${this.position.x}px`;
    this.playerDiv.style.top = `${this.position.y}px`;
    this.UpdateHitbox();
  }

  move(dx, dy, realPlayer, ghostPlayer) {
    ghostPlayer.inheritPosition(realPlayer);

    if (Math.abs(ghostPlayer.velocety.dx) < ghostPlayer.maxVelocety) {
      ghostPlayer.velocety.dx += dx;
    }

    ghostPlayer.position.x += ghostPlayer.velocety.dx;

    ghostPlayer.UpdateHitbox();

    let ghostCollisions = checkCollision(ghostPlayer, platforms);

    if (ghostPlayer.onGround) {
      realPlayer.onGround = true;
    }

    // if (ghostCollisions.length > 0) {
    //   if (ghostCollisions.indexOf("Left") != -1) {
    //     if (dx < 0) {
    //       realPlayer.velocety.dx = 0;
    //     }
    //   }
    //   if (ghostCollisions.indexOf("Right") != -1) {
    //     if (dx > 0) {
    //       realPlayer.velocety.dx = 0;
    //     }
    //   }
    // }

    if (Math.abs(realPlayer.velocety.dx) < realPlayer.maxVelocety) {
      realPlayer.velocety.dx += dx;
    }
    if (!ghostPlayer.onGround) {
      realPlayer.velocety.dy += realPlayer.gravity;
    }

    realPlayer.UpdateHitbox();
  }
}

class Coin {
  constructor(x, y) {
    this.position = new Point(x, y);
    this.width = 128;
    this.height = 128;
    this.textureIndex = 1;
    this.maxTextureIndex = 16;
    // this.hitbox
  }
  LoadCoin() {
    this.coinDiv = document.createElement("div");

    this.coinDiv.style.backgroundImage =
      "url('img/coin/2x/image " + this.textureIndex + ".png')";
    this.coinDiv.className = "coin";
    this.coinDiv.style.position = "absolute";
    this.coinDiv.style.left = `${this.position.x}px`;
    this.coinDiv.style.top = `${this.position.y}px`;
    this.coinDiv.style.zIndex = 12;
    this.coinDiv.style.width = `${this.width}px`;
    this.coinDiv.style.height = `${this.height}px`;
    this.coinDiv.style.backgroundSize = "contain"; // Ensure the image is fully contained
    this.coinDiv.style.backgroundPosition = "center"; // Center the image within the div
    this.coinDiv.style.backgroundRepeat = "no-repeat"; // Prevent the image from repeating

    document.body.appendChild(this.coinDiv);
  }
  UnloadCoin() {
    if (this.coinDiv && document.body.contains(this.coinDiv)) {
      document.body.removeChild(this.coinDiv);
    } else {
      console.warn("coinDiv does not exist or is not in the DOM.");
    }
  }

  loadNewTexture() {
    if (this.textureIndex >= this.maxTextureIndex) {
      this.textureIndex = 1;
    } else {
      this.textureIndex += 1;
    }
    let imagePath = "url('img/coin/2x/image " + this.textureIndex + ".png')";
    console.log(imagePath);
    // console.log(hei)
    // console.log(this);

    this.coinDiv.style.backgroundImage = imagePath;
  }
}

function inRange(value, min, max) {
  return value >= min && value <= max;
}

function checkCollision(ghostPlayer, platforms) {
  gameGui = document.querySelector("#gameGui");
  // let collision = false;
  let collisions = [];
  platformHitboxMargin = 20;

  for (let i = 0; i < platforms.length; i++) {
    let platform = platforms[i];

    if (inRange(ghostPlayer.PointD.x, platform.PointA.x, platform.PointB.x)) {
      if (
        inRange(
          ghostPlayer.PointD.y,
          platform.PointA.y,
          platform.PointA.y + platformHitboxMargin
        )
      ) {
        collisions.push("Bottom");

        // ghostPlayer.onGround = true;
      } else {
        // ghostPlayer.onGround = false;
      }
      if (
        inRange(
          ghostPlayer.PointA.y,
          platform.PointC.y - platformHitboxMargin,
          platform.PointC.y
        )
      ) {
        collisions.push("Top");
      }
    }
    if (
      inRange(ghostPlayer.PointD.y, platform.PointA.y, platform.PointC.y) ||
      inRange(ghostPlayer.PointA.y, platform.PointA.y, platform.PointC.y)
    ) {
      if (
        inRange(
          ghostPlayer.PointD.x,
          platform.PointA.x,
          platform.PointA.x + platformHitboxMargin
        )
      ) {
        collisions.push("Right");
      }
      if (
        inRange(
          ghostPlayer.PointA.x,
          platform.PointB.x - platformHitboxMargin,
          platform.PointB.x
        ) ||
        inRange(
          ghostPlayer.PointB.x,
          platform.PointB.x - platformHitboxMargin,
          platform.PointB.x
        )
      ) {
        collisions.push("Left");
      }
    }
  }

  return collisions;
}

function drawDot(ctx, x, y, color) {
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
}
function gameLoop(action, rangeIndex) {
  let spacing = 3;

  if (rangeIndex >= spacing) {
    coins.forEach(coin => {
      coin.loadNewTexture();
      
    });
    rangeIndex = 0;
  } else {
    rangeIndex += 1;
  }




  

  ghostPlayer = player1;
  player1.CheckForMovement(ghostPlayer);

  

  requestAnimationFrame(gameLoop.bind(this, action, rangeIndex));
}

document.onmousemove = function (e) {
  var x = e.pageX;
  var y = e.pageY;
  e.target.title = "X is " + x + " and Y is " + y;
};

const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

const platform1 = new Platform(2, 1, "grass", 221, 124);
const platform2 = new Platform(20, 1, "grass", 0, 500);
// const platform3 = new Platform(5, 1, "grass", 287, 500);

platform1.CreatePlatform();
platform2.CreatePlatform();
// platform3.CreatePlatform();

let platforms = [platform1, platform2];

const player1 = new Player(1100, 150);

player1.LoadPlayer("player1");
player1.InititatePlayerMovement();

const debugConsole = document.querySelector("#DebugText");

let coin1 = new Coin(650, 250);
coin1.LoadCoin();
let coin2 = new Coin(1000, 250);
coin2.LoadCoin();

let coins = [coin1, coin2];

let action = 0;
let rangeIndex = 0;

gameLoop(action, rangeIndex);
