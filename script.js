class Platform {
  constructor(width, height, type, x, y) {
    this.width = width;
    this.height = height;
    this.type = type;
    this.x = x;
    this.y = y;
  }

  CreateWide() {

    console.log("Creating wide platform");
    const platformDiv = document.createElement("div");
    // platformDiv.style.width = `${this.width*imageWidth}px`;
    platformDiv.className = "platform";
    platformDiv.style.display = "flex";

    platformDiv.style.position = "absolute";
    platformDiv.style.left = `${this.x}px`;
    platformDiv.style.top = `${this.y}px`;

    // platformDiv.style.width = `${this.width * 128}px`;
    // platformDiv.style.height = `${this.height * 128}px`;

    platformDiv.style.width = `${500}px`;
    platformDiv.style.height = `${100}px`;

    platformDiv.style.zIndex = 10;

    let singlePlatformWidth = 128;
    let singlePlatformHeight = 128;

    
    const platformImgDir = String.raw`img\Free Platform Game Assets\Platform Game Assets\Tiles\png\128x128`;
    // console.log(platformImgDir);


    // console.log(this.width)
    // console.log(this.height)

    for (let platformIndex = 0; platformIndex < this.width - 1; platformIndex++) {
      if (platformIndex == 0) {
        // console.log(platformImgDir);
        let leftPlatformImg = platformImgDir + "/GrassCliffLeft.png";
        // console.log(leftPlatformImg);

        const leftPlatformDiv = document.createElement("div");
        // leftPlatformDiv.style.backgroundColor = "red";
        let img = "url(" + String.raw`C:\dev\Javascript\PlatformingGame\img\128x128\GrassCliffLeft.png` + ")";
        console.log(img);
        leftPlatformDiv.style.backgroundImage = img
        console.log(leftPlatformDiv.style.backgroundImage);
        
        leftPlatformDiv.style.backgroundSize = "cover";

        

        leftPlatformDiv.style.width = `${singlePlatformWidth}px`;
        leftPlatformDiv.style.height = `${singlePlatformHeight}px`;
        // console.log(leftPlatformDiv);

        platformDiv.appendChild(leftPlatformDiv);
      }
      if (platformIndex == this.width - 1) {
        const rightPlatformImg = platformImgDir + "/GrassCliffRight.png";
        const rightPlatformDiv = document.createElement("div");
        rightPlatformDiv.style.backgroundImage = `url(${rightPlatformImg})`;
        rightPlatformDiv.style.width = `${singlePlatformWidth}px`;
        rightPlatformDiv.style.height = `${singlePlatformHeight}px`;

        platformDiv.appendChild(rightPlatformDiv);
      } else {
        const middlePlatformImg = platformImgDir + "/Grass.png";
        const middlePlatformDiv = document.createElement("div");
        middlePlatformDiv.style.backgroundImage = `url(${middlePlatformImg})`;
        middlePlatformDiv.style.width = `${singlePlatformWidth}px`;
        middlePlatformDiv.style.height = `${singlePlatformHeight}px`;

        platformDiv.appendChild(middlePlatformDiv);
      }
    }
    document.querySelector("#gameGui").appendChild(platformDiv);

    document.body.appendChild(platformDiv);
  }
}

const platform = new Platform(3, 1, "grass", 300, 200);

platform.CreateWide();