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
    this.PointB = new Point(this.position.x + this.width + 40, this.position.y);
    this.PointC = new Point(this.position.x, this.position.y + this.height);
    this.PointD = new Point(
      this.position.x + this.width + 40,
      this.position.y + this.height
    );
  }

  assingFramePlatformParams(framePlatformDiv, postion, width, height) {
    framePlatformDiv.className = "platform";
    framePlatformDiv.style.display = "flex";
    framePlatformDiv.style.flexDirection = "column";

    framePlatformDiv.style.position = "absolute";
    framePlatformDiv.style.left = `${postion.x}px`;
    framePlatformDiv.style.top = `${postion.y}px`;
    framePlatformDiv.style.width = `${width}px`;
    framePlatformDiv.style.height = `${height}px`;
    framePlatformDiv.style.zIndex = 10;
  }
  assignSlicePlatformParams(slicePlatformDiv, width, height) {
    slicePlatformDiv.className = "slicePlatform";
    slicePlatformDiv.style.display = "flex";
    slicePlatformDiv.style.flexDirection = "row";
    slicePlatformDiv.style.width = `${width}px`;
    slicePlatformDiv.style.height = `${height}px`;
    slicePlatformDiv.style.zIndex = 10;
  }

  assingChildPlatformParams(childPlatformDiv, platformImg, width, height) {
    childPlatformDiv.className = "childPlatform";
    childPlatformDiv.style.backgroundImage = platformImg;
    childPlatformDiv.style.backgroundSize = "cover";
    childPlatformDiv.style.width = `${width}px`;
    childPlatformDiv.style.height = `${height}px`;
  }
  getPlatformYType(numberOfBlocksY, platformYIndex) {
    let platformType = "Unkown";

    if (numberOfBlocksY == 1) {
      platformType = "topLevelSingleHeight";
    } else if (numberOfBlocksY > 1) {
      if (platformYIndex == 0) {
        platformType = "topLevelMultiHeight";
      } else if (platformYIndex == numberOfBlocksY - 1) {
        platformType = "bottomLevel";
      } else {
        platformType = "midLevel";
      }
    }
    return platformType;
  }

  CreatePlatform() {
    const framePlatformDiv = document.createElement("div");
    let platformXType = "Unkown";
    let platformYType = "Unkown";
    let platformImg = "Unkown";
    const platformImgDir = "img/platformBlocks/";

    this.assingFramePlatformParams(
      framePlatformDiv,
      this.position,
      this.width,
      this.height
    );

    for (
      let platformYIndex = 0;
      platformYIndex < this.numberOfBlocksY;
      platformYIndex++
    ) {
      const slicePlatformDiv = document.createElement("div");
      this.assignSlicePlatformParams(
        slicePlatformDiv,
        this.width,
        this.platformHeightAndWidth
      );

      for (
        let platformXIndex = 0;
        platformXIndex < this.numberOfBlocksX;
        platformXIndex++
      ) {
        const childPlatformDiv = document.createElement("div");
        let imgPath = "unassigned";

        if (this.numberOfBlocksX == 1) {
          platformXType = "Single";
          1;
        } else {
          if (platformXIndex == 0) {
            platformXType = "Left";
          } else if (platformXIndex == this.numberOfBlocksX - 1) {
            platformXType = "Right";
          } else {
            platformXType = "Mid";
          }
        }
        platformYType = this.getPlatformYType(
          this.numberOfBlocksY,
          platformYIndex
        );

        let platformImg =
          "url(" +
          platformImgDir +
          "/" +
          platformYType +
          "/" +
          platformXType +
          ".png)";

        this.assingChildPlatformParams(
          childPlatformDiv,
          platformImg,
          this.platformHeightAndWidth,
          this.platformHeightAndWidth
        );
        slicePlatformDiv.append(childPlatformDiv);
      }

      framePlatformDiv.appendChild(slicePlatformDiv);
    }
    document.body.appendChild(framePlatformDiv);
  }
}

class Player {
  constructor(startingPosX, startingPosY) {
    this.width = 50;
    this.height = 50;
    this.pace = new Vector(0.08, 3);
    this.gravity = 0.23;
    this.jumpPower = -12.0;
    this.maxVelocety = 5;
    this.friction = 0.1;

    this.startingPos = new Point(startingPosX, startingPosY);
    this.position = new Point(startingPosX, startingPosY);
    this.keys = [];
    this.velocety = new Vector(0, 0);
    this.jumping = false;
    this.onGround = false;
    this.canJump = true;
    this.climbSpeed = -0;

    this.textureIndex = 1;
    // this.maxTextureIndex = 18;
    this.maxTextureIndex = 5;
    this.textureIndexJump = 1;

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
    this.playerDiv.style.backgroundSize = "contain"; // Ensure the image is fully contained
    this.playerDiv.style.backgroundPosition = "center"; // Center the image within the div
    this.playerDiv.style.backgroundRepeat = "no-repeat"; // Prevent the image from repeating

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
    // debugConsole.textContent = this.velocety.dx;
    // console.log(this.velocety.dx);

    if (this.keys.indexOf("ArrowRight") != -1 || this.keys.indexOf("d") != -1) {
      this.move(this.pace.dx, 0, this, ghostPlayer);
    }
    if (this.keys.indexOf("ArrowLeft") != -1 || this.keys.indexOf("a") != -1) {
      this.move(-this.pace.dx, 0, this, ghostPlayer);
    }
    if (this.keys.indexOf(" ") != -1 && this.onGround) {
      this.velocety.dy = this.jumpPower;
      ghostPlayer.velocety.dy = ghostPlayer.jumpPower;

      if (this.velocety.dx > 0) {
        this.playerDiv.style.backgroundImage =
          "url('img/characters/player/facingRight/jumping.png')";
      } else if (this.velocety.dx < 0) {
        this.playerDiv.style.backgroundImage =
          "url('img/characters/player/facingLeft/jumping.png')";
      }
    }
    if (this.velocety.dy > 0.5) {
      if (this.velocety.dx > 0) {
        this.playerDiv.style.backgroundImage =
          "url('img/characters/player/facingRight/landing.png')";
      } else if (this.velocety.dx < 0) {
        this.playerDiv.style.backgroundImage =
          "url('img/characters/player/facingLeft/landing.png')";
      }
    }
    if (this.velocety.dx == 0 && this.velocety.dy == 0) {
      this.playerDiv.style.backgroundImage =
        "url('img/characters/player/facingRight/idle.png')";
    }

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
    // if (ghostCollisions.indexOf("Top") != -1) {
    //   this.velocety.dy = this.velocety.dy * -0.7;
    // }

    if (
      this.onGround &&
      this.keys.indexOf("a") != -1 &&
      this.keys.indexOf("d") != -1
    ) {
      this.velocety.dx = 0;
    }

    this.position.x += this.velocety.dx;
    this.position.y += this.velocety.dy;

    this.playerDiv.style.left = `${this.position.x}px`;
    this.playerDiv.style.top = `${this.position.y}px`;
    this.UpdateHitbox();
  }

  animateRunning(player, direction) {
    if (this.textureIndex >= this.maxTextureIndex) {
      player.textureIndex = 1;
    } else {
      this.textureIndex += this.textureIndexJump;
    }
    let imagePath =
      "url('" +
      "img/characters/player/" +
      direction +
      "/running/" +
      this.textureIndex +
      ".png" +
      "')";

    this.playerDiv.style.backgroundImage = imagePath;
    // console.log(this.playerDiv.style.backgroundImage);
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
    // debugConsole.textContent = ghostCollisions;

    if (ghostCollisions.length > 0) {
      if (ghostCollisions.indexOf("LeftWall") != -1) {
        if (ghostPlayer.velocety.dx < 0) {
          realPlayer.velocety.dx = 1;
        }
      }
      if (ghostCollisions.indexOf("Left") != -1) {
        realPlayer.velocety.dx = 1;
        // if (!realPlayer.onGround) {
        //   realPlayer.velocety.dy = realPlayer.climbSpeed;
        // }
      }
      if (ghostCollisions.indexOf("RightWall") != -1) {
        if (ghostPlayer.velocety.dx > 0) {
          realPlayer.velocety.dx = -1;
        }
      }
      if (ghostCollisions.indexOf("Right") != -1) {
        realPlayer.velocety.dx = -1;
        // if (!realPlayer.onGround) {
        //   realPlayer.velocety.dy = realPlayer.climbSpeed;
        // }
      }
    }

    if (Math.abs(realPlayer.velocety.dx) < realPlayer.maxVelocety) {
      realPlayer.velocety.dx += dx;
    }
    if (!ghostPlayer.onGround) {
      realPlayer.velocety.dy += realPlayer.gravity;
    }

    if (realPlayer.onGround) {
      if (realPlayer.velocety.dx > 0) {
        if (rangeIndex >= spacing) {
          this.animateRunning(realPlayer, "facingRight");
          rangeIndex = 0;
        } else {
          rangeIndex += 1;
        }
        // this.animateRunning(realPlayer, "facingRight");
      }
      if (realPlayer.velocety.dx < 0) {
        if (rangeIndex >= spacing) {
          this.animateRunning(realPlayer, "facingLeft");
          rangeIndex = 0;
        } else {
          rangeIndex += 1;
        }
        // this.animateRunning(realPlayer, "facingLeft");
      }
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
    this.textureIndexJump = 1;

    this.widthAndHeight = 40;
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
    this.coinDiv.style.width = `${this.widthAndHeight}px`;
    this.coinDiv.style.height = `${this.widthAndHeight}px`;
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
      this.textureIndex += this.textureIndexJump;
    }
    let imagePath = "url('img/coin/2x/image " + this.textureIndex + ".png')";
    // console.log(this.textureIndexJump)

    this.coinDiv.style.backgroundImage = imagePath;
    console.log(this.textureIndex);
    // console.log(this.coinDiv.style.backgroundImage);
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
      inRange(ghostPlayer.PointD.y, platform.PointA.y + 10, platform.PointC.y) ||
      inRange(ghostPlayer.PointA.y, platform.PointA.y + 10, platform.PointC.y)
    ) {
      if (
        inRange(
          ghostPlayer.PointD.x,
          platform.PointA.x,
          platform.PointA.x + platformHitboxMargin
        )
      ) {
        if (ghostPlayer.onGround) {
          collisions.push("Right");
        }
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
        if (ghostPlayer.onGround) {
          collisions.push("Left");
        }
      }
    }
  }

  if (ghostPlayer.PointC.x < 0 || ghostPlayer.PointC.x > window.innerWidth) {
    collisions.push("LeftWall");
  }
  if (ghostPlayer.PointD.x > window.innerWidth) {
    collisions.push("RightWall");
  }

  return collisions;
}

function drawDot(ctx, x, y, color, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
}
function findCenterPoint(point1, point2) {
  const centerX = (point1.x + point2.x) / 2;
  const centerY = (point1.y + point2.y) / 2;
  return new Point(centerX, centerY);
}
function gameLoop(action, rangeIndex) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (rangeIndex >= spacing) {
    coins.forEach((coin) => {
      coin.loadNewTexture();
    });
    rangeIndex = 0;
  } else {
    rangeIndex += 1;
  }

  ghostPlayer = player1;
  player1.CheckForMovement(ghostPlayer);

  playerCenter = findCenterPoint(player1.PointA, player1.PointD);

  drawDot(
    ctx,
    playerCenter.x,
    playerCenter.y,
    "#ee534f" /* red */,
    (radius = 5)
  );

  // console.log(player1.playerDiv.style.backgroundImage);

  // platforms.forEach((platform) => {
  //   drawDot(ctx, platform.PointB.x, platform.PointB.y, "blue", (radius = 5));
  // });

  requestAnimationFrame(gameLoop.bind(this, action, rangeIndex));
}

function platformPlacingModeDev() {
  document.addEventListener("click", (e) => {
    let x = e.pageX;
    let y = e.pageY;

    console.log(
      'const platformX = new Platform(2, 1, "grass", ' + x + ", " + y + ");"
    );
    console.log("platformX.CreatePlatform();");
  });
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

//Level 1
const platform1 = new Platform(4, 3, "grass", 0, 600);
const platform2 = new Platform(3, 2, "grass", platform1.width, 450);
const platform3 = new Platform(2, 2, "grass", 1000, 480);
const platform4 = new Platform(5, 3, "grass", 1400, 350);
const platform44 = new Platform(5, 1, "grass", 1420, 60);
const platform5 = new Platform(3, 1, "grass", 950, 180);
const platform6 = new Platform(5, 1, "grass", 288, 100);
const platform7 = new Platform(3, 2, "grass", 0, platform6.PointA.y + platform6.height);

platform1.CreatePlatform();
platform2.CreatePlatform();
platform3.CreatePlatform();
platform4.CreatePlatform();
platform44.CreatePlatform();
platform5.CreatePlatform();
platform6.CreatePlatform();
platform7.CreatePlatform();

// platform3.CreatePlatform();

let platforms = [platform1, platform2, platform3, platform4, platform5, platform6, platform7, platform44];

const player1 = new Player(20, 200);

player1.LoadPlayer("player1");
player1.InititatePlayerMovement();

// const debugConsole = document.querySelector("#DebugText");

let coin1 = new Coin(platform2.PointA.x + 30, platform2.PointA.y - 65);
coin1.LoadCoin();
let coin2 = new Coin(platform44.PointA.x + 40, platform44.PointA.y - 65);
coin2.LoadCoin();
let coin3 = new Coin(840, 12);
coin3.LoadCoin();

let coins = [coin1, coin2, coin3];

let action = 0;
let rangeIndex = 0;
let spacing = 3;
let optimisationMode = false;

// platformPlacingModeDev();

if (optimisationMode) {
  let part = 0.25;
  spacing = 10;

  for (let i = 0; i < coins.length; i++) {
    let coin = coins[i];
    console.log("heoi   " + coin.textureIndexJump / part);
    coin.maxTextureIndex = coin.maxTextureIndex * part;
    coin.textureIndexJump = coin.textureIndexJump / part;
    console.log("Jump  " + coin.textureIndexJump);
  }

  player1.maxTextureIndex = player1.maxTextureIndex * part;
  player1.textureIndexJump = player1.textureIndexJump / part;
}

gameLoop(action, rangeIndex);
