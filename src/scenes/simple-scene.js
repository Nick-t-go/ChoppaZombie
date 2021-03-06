import { ScreenConfig } from "../classes/util/screenConfig";
import { AlignGrid } from "../classes/util/alignGrid";
import { Align } from "../classes/util/align";

import { Controller } from "../classes/mc/controller";

import { MediaManager } from "../classes/util/mediaManager";

import { Constants } from "../constants";

import { Model } from "../classes/mc/model";

import { SoundButtons } from "../classes/ui/soundButtons";

import { Bar } from "../classes/components/bar";

class SimpleScene extends Phaser.Scene {
  constructor() {
    super("SceneMain");
  }

  create() {
    this.add.text(100, 100, "Hello Phaser!", {
      fill: "#0f0"
    });
    const gridConfig = {
      rows: 11,
      cols: 11,
      scene: this
    };

    this.emitter = new Phaser.Events.EventEmitter();
    this.G = new Constants();
    this.model = new Model(this.emitter, this.G);
    this.controller = new Controller(this.emitter, this.G, this.model);

    this.mediaManager = new MediaManager({
      scene: this,
      model: this.model
    });
    this.mediaManager.setBackgroundMusic("backgroundMusic");

    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);

    this.physics.world.setBounds(
      0,
      0,
      this.background.displayWidth,
      this.background.displayHeight
    );
    this.choppa = this.physics.add.sprite(0, 0, "choppa");
    this.choppa.rotation = 1.5;
    this.cameras.main.setBounds(
      0,
      0,
      this.background.displayWidth,
      this.background.displayHeight
    );
    this.cameras.main.startFollow(this.choppa, true);

    Align.scaleToGameW(this.choppa, 0.55, ScreenConfig.width());

    //THIS CODE BELOW IS REPEATED FROM INTRO SCENE

    const frameNames = this.anims.generateFrameNames("choppa", {
      start: 0,
      end: 4,
      zeroPad: 4,
      prefix: "Helicopter",
      suffix: ".png"
    });
    const config = {
      key: "hover",
      frames: frameNames,
      frameRate: 40,
      repeat: -1
    };
    const anim = this.anims.create(config);
    this.choppa.anims.load("hover");
    this.choppa.anims.play("hover");
    //

    const alignGrid = new AlignGrid(gridConfig, {
      height: this.background.displayHeight,
      width: this.background.displayWidth
    });
    alignGrid.showNumbers();

    this.bar = new Bar({
      scene: this,
      x: 240,
      y: 330
    });
    this.bar.setPercent(0.5);
    alignGrid.placeAtIndex(22, this.bar);
    alignGrid.placeAtIndex(58, this.choppa);

    this.background.setInteractive();
    this.background.on("pointerdown", this.onDown, this);
    this.background.on("pointerup", this.backgroundClicked, this);
  }

  toDegrees(radians) {
    return radians * (180 / Math.PI);
  }

  getTimer() {
    return new Date().getTime();
  }

  onDown() {
    this.downTime = this.getTimer();
  }

  backgroundClicked() {
    const elapsed = Math.abs(this.downTime - this.getTimer());
    if (elapsed < 300) {
      this.tx = this.background.input.localX;
      this.ty = this.background.input.localY;

      this.radians = this.physics.moveTo(this.choppa, this.tx, this.ty, 100);
      const angle = this.toDegrees(this.radians);
      // this.directionAngle = angle + 90;
      // this.radians = radians;
      // console.log(angle, this.directionAngle);
      console.log(angle, this.radians);
      console.log(
        "angle:",
        this.choppa.angle,
        "rotation:",
        this.choppa.rotation
      );
    }
  }

  compareAngles(a1, a2) {
    if (a2 > 180) {
      a2 = (a2 % 180) * -1 - 90;
    }
    return (a1 <= a2 + 5 && a1 > a2) || (a1 >= a2 - 5 && a1 < a2);
  }

  update() {
    //console.log(this.choppa.angle)
    const distance = Phaser.Math.Distance.Between(
      this.choppa.x,
      this.choppa.y,
      this.tx,
      this.ty
    );
    if (distance < 4) {
      this.choppa.body.setVelocity(0);
    }
    if (this.radians !== this.choppa.roations) {
      this.choppa.rotation = this.radians + 1.5;
    }
  }
}

export { SimpleScene };
