import { ScreenConfig } from "../classes/util/screenConfig";

import { Bar } from "../classes/components/bar";

class SceneLoad extends Phaser.Scene {
  constructor() {
    super("SceneLoader");
  }

  preload() {
    this.bar = new Bar({
      scene: this,
      x: ScreenConfig.width() / 2,
      y: ScreenConfig.height() / 2
    });

    this.progText = this.add.text(
      ScreenConfig.width() / 2,
      ScreenConfig.height() / 2,
      "0%",
      {
        color: "#ffffff",
        fontSize: ScreenConfig.width() / 20
      }
    );
    this.progText.setOrigin(0.5, 0.5);
    this.load.on("progress", this.onProgress, this);
    this.load.image("button1", "assets/ui/buttons/2/1.png");
    this.load.image("button2", "assets/ui/buttons/2/5.png");
    this.load.audio("cat", ["assets/audio/meow.mp3", "assets/audio/meow.ogg"]);
    this.load.audio("backgroundMusic", [
      "assets/audio/background.mp3",
      "assets/audio/background.ogg"
    ]);

    this.load.atlas(
      "choppa",
      "assets/sprites/Helicopter.png",
      "assets/sprites/Helicopter.json"
    );
    this.load.atlas(
      "boyupladder",
      "assets/sprites/BoyUpdLadder.png",
      "assets/sprites/BoyUpdLadder.json"
    );
    this.load.atlas(
      "waving",
      "assets/sprites/Waving.png",
      "assets/sprites/Waving.json"
    );
    this.load.atlas(
      "monstar",
      "assets/sprites/MonstarTest.png",
      "assets/sprites/MonstarTest.json"
    );
    this.load.image("background", "assets/background.jpg");
  }

  onProgress(value) {
    const per = Math.floor(value * 100);
    this.progText.setText(`${per}%`);
    this.bar.setPercent(value);
  }

  create() {
    this.scene.start("SceneTitle");
  }
}

export { SceneLoad };
