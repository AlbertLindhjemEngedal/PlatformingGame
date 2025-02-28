class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xy = [x, y];
  }
}
class Platform {
  constructor(width, height, type, x, y) {
    let platformHightAndWidth = 128; // Automate this ??

    this.numberOfBlocksX = width;
    this.numberOfBlocksY = height;
    this.width = width * platformHightAndWidth;
    this.height = height * platformHightAndWidth;

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

  CreatePlatform() {
    const framePlatformDiv = document.createElement("div");

    AssingFramePlatformParams(
      framePlatformDiv,
      this.PointA,
      this.width,
      this.height
    );

    let platformType = "Unkown";
    for (let platformIndex = 0; platformIndex < this.width; platformIndex++) {
      const childPlatformDiv = document.createElement("div");
      if (this.width == 1) {
        platformType = "Single";
      } else {
        if (platformIndex == 0) {
          platformType = "Left";
        } else if (platformIndex == this.width - 1) {
          platformType = "Right";
        } else {
          platformType = "Mid";
        }
      }
      let platformImg =
        "url(" + String.raw`img/128x128/GrassCliff` + platformType + ".png)";

      AssingChildPlatformParams(
        childPlatformDiv,
        platformImg,
        this.platformHightAndWidth
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
    // this.topHitbox =

    this.PointA = this.position;
    this.PointB = new Point(this.position.x + this.width, this.position.y);
    this.PointC = new Point(this.position.x, this.position.y + this.height);
    this.PointD = new Point(this.position.x + this.width,this.position.y + this.height);
  }
  UpdateHitbox() {
    this.PointA = this.position;
    this.PointB = new Point(this.position.x + this.width, this.position.y);
    this.PointC = new Point(this.position.x, this.position.y + this.height);
    this.PointD = new Point(this.position.x + this.width,this.position.y + this.height);
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
    this.playerDiv.style.width = `78px`;
    this.playerDiv.style.height = `83px`;

    document.body.appendChild(this.playerDiv);
  }
  InititatePlayerMovement() {
    document.addEventListener("keydown", (e) => {
      this.keys.push(e.key);
    });

    document.addEventListener("keyup", (e) => {
      let index = this.keys.indexOf(e.key);
      if (index > -1) {
        this.keys.splice(index, 1);
        console.log("Key removed");
      }
    });

    this.MovePlayer.bind(this);
    this.MovePlayer();
  }

  MovePlayer(e) {
    if (this.keys.indexOf("ArrowRight") != -1 || this.keys.indexOf("d") != -1) {
      this.position.x += 10;
    }
    if (this.keys.indexOf("ArrowLeft") != -1 || this.keys.indexOf("a") != -1) {
      this.position.x -= 10;
    }
    if (this.keys.indexOf("ArrowUp") != -1 || this.keys.indexOf("w") != -1) {
      this.position.y -= 10;
    }
    if (this.keys.indexOf("ArrowDown") != -1 || this.keys.indexOf("s") != -1) {
      this.position.y += 10;
    }
    this.UpdateHitbox();

    this.playerDiv.style.left = `${this.position.x}px`;
    this.playerDiv.style.top = `${this.position.y}px`;

    requestAnimationFrame(this.MovePlayer.bind(this));
  }
}

function AssingChildPlatformParams(
  childPlatformDiv,
  platformImg,
  hightAndWidth
) {
  childPlatformDiv.style.backgroundImage = platformImg;
  childPlatformDiv.style.backgroundSize = "cover";
  childPlatformDiv.style.width = hightAndWidth;
  childPlatformDiv.style.height = hightAndWidth;
}
function AssingFramePlatformParams(framePlatformDiv, postion, width, height) {
  framePlatformDiv.className = "platform";
  framePlatformDiv.style.display = "flex";
  framePlatformDiv.style.position = "absolute";
  framePlatformDiv.style.left = `${postion.x}px`;
  framePlatformDiv.style.top = `${postion.y}px`;
  framePlatformDiv.style.width = `${width}px`;
  framePlatformDiv.style.height = `${height}px`;
  framePlatformDiv.style.zIndex = 10;
}

// function checkCollision(player, platforms) {
//   if (player.)

  

// }

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




const player1 = new Player(300, 150);

player1.LoadPlayer();
player1.InititatePlayerMovement();

// checkCollision(player1, platforms)
