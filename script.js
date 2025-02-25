class Platform {
  constructor(width, height, type, x, y) {
    this.width = width;
    this.height = height;
    this.type = type;
    this.x = x;
    this.y = y;
  }

  CreatePlatform() {
    const framePlatformDiv = document.createElement("div");
    // platformDiv.style.width = `${this.width*imageWidth}px`;
    framePlatformDiv.className = "platform";
    framePlatformDiv.style.display = "flex";
    framePlatformDiv.style.position = "absolute";
    framePlatformDiv.style.left = `${this.x}px`;
    framePlatformDiv.style.top = `${this.y}px`;
    // platformDiv.style.width = `${this.width * 128}px`;
    // platformDiv.style.height = `${this.height * 128}px`;
    framePlatformDiv.style.width = `${500}px`;
    framePlatformDiv.style.height = `${100}px`;
    framePlatformDiv.style.zIndex = 10;

    let singlePlatformWidth = 128;
    let singlePlatformHeight = 128;
    let platformType = "Unkown";

    for (
      let platformIndex = 0;
      platformIndex < this.width - 1;
      platformIndex++
    ) {
      const childPlatformDiv = document.createElement("div");

      if (platformIndex == 0) {
        platformType = "Left";
      }
      if (platformIndex == this.width - 1) {
        platformType = "Right";
      } else {
        platformType = "Mid";
      }

      let platformImg =
        "url(" + String.raw`img\128x128\GrassCliff` + platformType + ".png)";
      console.log(platformImg);

      childPlatformDiv.style.backgroundImage = platformImg;
      childPlatformDiv.style.backgroundSize = "cover";
      childPlatformDiv.style.width = `${singlePlatformWidth}px`;
      childPlatformDiv.style.height = `${singlePlatformHeight}px`;

      framePlatformDiv.appendChild(childPlatformDiv);
    }
    document.querySelector("#gameGui").appendChild(framePlatformDiv);
    document.body.appendChild(framePlatformDiv);
  }
}
//     for (
//       let platformIndex = 0;
//       platformIndex < this.width - 1;
//       platformIndex++
//     ) {
//       if (platformIndex == 0) {
//         // console.log(platformImgDir);
//         let leftPlatformImg = platformImgDir + "/GrassCliffLeft.png";
//         // console.log(leftPlatformImg);

//         const leftPlatformDiv = document.createElement("div");
//         // leftPlatformDiv.style.backgroundColor = "red";
//         let img = "url(" + String.raw`img\128x128\GrassCliffLeft.png` + ")";
//         console.log(img);
//         leftPlatformDiv.style.backgroundImage = img;
//         console.log(leftPlatformDiv.style.backgroundImage);

//         leftPlatformDiv.style.backgroundSize = "cover";

//         leftPlatformDiv.style.width = `${singlePlatformWidth}px`;
//         leftPlatformDiv.style.height = `${singlePlatformHeight}px`;
//         // console.log(leftPlatformDiv);

//         platformDiv.appendChild(leftPlatformDiv);
//       }
//       if (platformIndex == this.width - 1) {
//         const rightPlatformImg = platformImgDir + "/GrassCliffRight.png";
//         const rightPlatformDiv = document.createElement("div");
//         rightPlatformDiv.style.backgroundImage = `url(${rightPlatformImg})`;
//         rightPlatformDiv.style.width = `${singlePlatformWidth}px`;
//         rightPlatformDiv.style.height = `${singlePlatformHeight}px`;

//         platformDiv.appendChild(rightPlatformDiv);
//       } else {
//         const middlePlatformImg = platformImgDir + "/Grass.png";
//         const middlePlatformDiv = document.createElement("div");
//         middlePlatformDiv.style.backgroundImage = `url(${middlePlatformImg})`;
//         middlePlatformDiv.style.width = `${singlePlatformWidth}px`;
//         middlePlatformDiv.style.height = `${singlePlatformHeight}px`;

//         platformDiv.appendChild(middlePlatformDiv);
//       }
//     }
//     document.querySelector("#gameGui").appendChild(platformDiv);

//     document.body.appendChild(platformDiv);
//   }
// }

const platform = new Platform(3, 1, "grass", 300, 200);

platform.CreatePlatform();
