class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xy = [x, y];
  }
}
class Platform {
  constructor(width, height, type, x, y) {
    this.platformHeightAndWidth = 128; // Automate this ??

    this.numberOfBlocksX = width;
    this.numberOfBlocksY = height;
    this.width = width * this.platformHeightAndWidth;
    this.height = height * this.platformHeightAndWidth;

    this.type = type;
    this.position = new Point(x, y);
    // X and Y pos are the top left corner of the platform

    this.PointA = this.position;
    this.PointB = new Point(this.position.x + this.width, this.position.y);
    this.PointC = new Point(this.position.x, this.position.y + this.height);
    this.PointD = new Point(
      this.position.x + this.width,
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
    this.startingPos = new Point(startingPosX, startingPosY);
    this.position = new Point(startingPosX, startingPosY);
    this.keys = [];

    this.width = 78;
    this.height = 84;

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
  copy() {
    const copy = new Player(this.startingPos.x, this.startingPos.y);
    copy.position = new Point(this.position.x, this.position.y);
    copy.keys = [...this.keys];
    copy.width = this.width;
    copy.height = this.height;
    return copy;
  }

  LoadPlayer() {
    this.playerDiv = document.createElement("div");
    this.playerDiv.style.backgroundImage =
      "url('img/characters/player/idle.png')";
    this.playerDiv.className = "player";
    this.playerDiv.style.position = "absolute";
    this.playerDiv.style.left = `${this.startingPos.x}px`;
    this.playerDiv.style.top = `${this.startingPos.y}px`;
    this.playerDiv.style.zIndex = 11;
    this.playerDiv.style.width = `${this.width}px`;
    this.playerDiv.style.height = `${this.height}px`;

    document.body.appendChild(this.playerDiv);
    this.UpdateHitbox();
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
      }
    });

    this.MovePlayer.bind(this);
    this.MovePlayer();
  }
  move(dx, dy, player, suggestedMovementPlayer) {
    suggestedMovementPlayer.UpdateHitbox();
    suggestedMovementPlayer.position.x += dx;
    suggestedMovementPlayer.position.y += dy;
    suggestedMovementPlayer.UpdateHitbox();

    let collisions = checkCollision(suggestedMovementPlayer, platforms);

    if (collisions.length > 0) {
      if (collisions.indexOf("Top") != -1) {
        if (dy < 0) {
          dy = 0;
        }
      }
      if (collisions.indexOf("Bottom") != -1) {
        if (dy > 0) {
          dy = 0;
        }
      }
      if (collisions.indexOf("Left") != -1) {
        if (dx < 0) {
          dx = 0;
        }
      }
      if (collisions.indexOf("Right") != -1) {
        if (dx > 0) {
          dx = 0;
        }
      }
    }

    player.position.x += dx;
    player.position.y += dy;
    player.UpdateHitbox();
  }

  MovePlayer(e) {
    let suggestedMovementPlayer = this.copy();
    // console.log(suggestedMovementPlayer.position);
    if (this.keys.indexOf("ArrowRight") != -1 || this.keys.indexOf("d") != -1) {
      this.move(10, 0, this, suggestedMovementPlayer);
    }
    suggestedMovementPlayer = this.copy();
    if (this.keys.indexOf("ArrowLeft") != -1 || this.keys.indexOf("a") != -1) {
      this.move(-10, 0, this, suggestedMovementPlayer);
    }
    suggestedMovementPlayer = this.copy();

    if (this.keys.indexOf("ArrowUp") != -1 || this.keys.indexOf("w") != -1) {
      this.move(0, -10, this, suggestedMovementPlayer);
    }
    suggestedMovementPlayer = this.copy();
    if (this.keys.indexOf("ArrowDown") != -1 || this.keys.indexOf("s") != -1) {
      this.move(0, 10, this, suggestedMovementPlayer);
    }
    suggestedMovementPlayer = this.copy();

    this.UpdateHitbox();
    this.playerDiv.style.left = `${this.position.x}px`;
    this.playerDiv.style.top = `${this.position.y}px`;
    this.UpdateHitbox();

    requestAnimationFrame(this.MovePlayer.bind(this));
  }
}
function inRange(value, min, max) {
  return value >= min && value <= max;
}

function checkCollision(player, platforms) {
  gameGui = document.querySelector("#gameGui");
  // let collision = false;
  let collisions = [];
  platformHitboxMargin = 0.3;

  for (let i = 0; i < platforms.length; i++) {
    let platform = platforms[i];
    console.log("Index: " + i);
    console.log("Platform: " + platform);

    if (inRange(player.PointD.x, platform.PointA.x, platform.PointB.x)) {
      if (
        inRange(
          player.PointD.y,
          platform.PointA.y,
          platform.PointA.y + platform.height * platformHitboxMargin
        )
      ) {
        collisions.push("Bottom");
      }
      if (
        inRange(
          player.PointA.y,
          platform.PointC.y - platform.height * platformHitboxMargin,
          platform.PointC.y
        )
      ) {
        collisions.push("Top");
      }
    }
    if (
      inRange(player.PointD.y, platform.PointA.y, platform.PointC.y) ||
      inRange(player.PointA.y, platform.PointA.y, platform.PointC.y)
    ) {
      if (
        inRange(
          player.PointD.x,
          platform.PointA.x,
          platform.PointA.x + platform.width * platformHitboxMargin
        )
  
      ) {
        collisions.push("Right");
      }
      if (
        inRange(
          player.PointA.x,
          platform.PointB.x - platform.height * platformHitboxMargin,
          platform.PointB.x
        ) ||
        inRange(
          player.PointA.x,
          platform.PointB.x - platform.height * platformHitboxMargin,
          platform.PointB.x
        )
      ) {
        collisions.push("Left");
      }
    }
  }
  console.log("Collisions: " + collisions);
  return collisions;
}

document.onmousemove = function (e) {
  var x = e.pageX;
  var y = e.pageY;
  e.target.title = "X is " + x + " and Y is " + y;
};

const platform1 = new Platform(2, 1, "grass", 221, 124);
const platform2 = new Platform(2, 1, "grass", 1050, 350);
const platform3 = new Platform(5, 1, "grass", 287, 500);

platform1.CreatePlatform();
platform2.CreatePlatform();
platform3.CreatePlatform();

let platforms = [platform1, platform2, platform3];

const player1 = new Player(650, 250);

player1.LoadPlayer();
player1.InititatePlayerMovement();
