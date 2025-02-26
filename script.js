class Platform {
  constructor(width, height, type, x, y) {
    this.width = width;
    this.height = height;
    this.type = type;
    this.x = x;
    this.y = y;
    // X and Y pos are the top left corner of the platform
  }

  CreatePlatform() {
    const framePlatformDiv = document.createElement("div");

    AssingFramePlatformParams(
      framePlatformDiv,
      this.x,
      this.y,
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

      AssingChildPlatformParams(childPlatformDiv, platformImg);
      framePlatformDiv.appendChild(childPlatformDiv);
    }
    // document.querySelector("#gameGui").appendChild(framePlatformDiv);
    document.body.appendChild(framePlatformDiv);
  }
}
class Player {
  constructor(startingPosX, startingPosY) {
    this.startingPosX = startingPosX;
    this.startingPosY = startingPosY;
    this.playerPosX = startingPosX;
    this.playerPosY = startingPosY;
    this.keys = [];
  }

  LoadPlayer() {
    this.playerDiv = document.createElement("div");
    this.playerDiv.style.backgroundImage =
      "url('img/characters/player/idle.png')";

    this.playerDiv.className = "player";
    this.playerDiv.style.position = "absolute";
    this.playerDiv.style.left = `${this.startingPosX}px`;
    this.playerDiv.style.top = `${this.startingPosY}px`;
    this.playerDiv.style.zIndex = 11;
    this.playerDiv.style.width = `78px`;
    this.playerDiv.style.height = `83px`;

    document.body.appendChild(this.playerDiv);

    console.log(this.playerDiv);
  }
  InititatePlayerMovement() {
    document.addEventListener("keydown", (e) => {
      this.keys.push(e.key);
    });

    document.addEventListener("keyup", (e) => {
      let index = this.keys.indexOf(e.key);
      if (index > -1) {
        this.keys.splice(index, 1); // Remove the key from the array
        console.log("Key removed");
      }
    });

    this.MovePlayer.bind(this);
    this.MovePlayer();

  }

  MovePlayer(e) {
    console.log(this.keys)
    console.log(this.keys.indexOf("ArrowRight"));

    if (this.keys.indexOf("ArrowRight") != -1) {
      console.log("Right");
      this.playerPosX += 10;
    }
    if (this.keys.indexOf("ArrowLeft") != -1) {
      this.playerPosX -= 10;
    }
    if (this.keys.indexOf("ArrowUp") != -1) {
      this.playerPosY -= 10;
    }
    if (this.keys.indexOf("ArrowDown") != -1) {
      this.playerPosY += 10;
    }
    console.log(this.keys);
    this.playerDiv.style.left = `${this.playerPosX}px`;
    this.playerDiv.style.top = `${this.playerPosY}px`;


    this.MovePlayer
    requestAnimationFrame(this.MovePlayer.bind(this));
    
    
  }
}

function AssingChildPlatformParams(childPlatformDiv, platformImg) {
  childPlatformDiv.style.backgroundImage = platformImg;
  childPlatformDiv.style.backgroundSize = "cover";
  childPlatformDiv.style.width = `128px`;
  childPlatformDiv.style.height = `128px`;
}
function AssingFramePlatformParams(
  framePlatformDiv,
  xPos,
  yPos,
  width,
  height
) {
  framePlatformDiv.className = "platform";
  framePlatformDiv.style.display = "flex";
  framePlatformDiv.style.position = "absolute";
  framePlatformDiv.style.left = `${xPos}px`;
  framePlatformDiv.style.top = `${yPos}px`;
  framePlatformDiv.style.width = `${width * 128}px`;
  framePlatformDiv.style.height = `${height * 128}px`;
  framePlatformDiv.style.zIndex = 10;
}

document.onmousemove = function (e) {
  var x = e.pageX;
  var y = e.pageY;
  e.target.title = "X is " + x + " and Y is " + y;
};

const platform = new Platform(2, 1, "grass", 221, 124);
const platform2 = new Platform(2, 1, "grass", 1050, 350);
const platform3 = new Platform(5, 1, "grass", 287, 500);

platform.CreatePlatform();
platform2.CreatePlatform();
platform3.CreatePlatform();

const player1 = new Player(300, 150);

player1.LoadPlayer();
player1.InititatePlayerMovement();
