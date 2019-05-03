import {
  AlignGrid,
} from '../classes/util/alignGrid';
import {
  ScreenConfig,
} from '../classes/util/screenConfig';
import {
  Align,
} from '../classes/util/align';
import {
  FlatButton,
} from '../classes/ui/flatButton';


class SceneTitle extends Phaser.Scene {
  constructor() {
    super('SceneTitle');
  }

  preload() {
    this.load.image('title', 'assets/title.png');
    this.load.image('button1', 'assets/ui/buttons/2/1.png');
  }

  create() {
    const gridConfig = {
      rows: 11,
      cols: 11,
      scene: this,
    };

    this.emitter = new Phaser.Events.EventEmitter();

    this.alignGrid = new AlignGrid(
      gridConfig, {
        height: ScreenConfig.height(),
        width: ScreenConfig.width(),
      },
    );
    //this.alignGrid.showNumbers();

    const title = this.add.image(0, 0, 'title');
    const btnStart = new FlatButton({
      scene: this,
      key: 'button1',
      text: 'start',
      event: 'start_game',
      emitter: this.emitter,

    });

    Align.scaleToGameW(title, 0.8, ScreenConfig.width());
    this.alignGrid.placeAtIndex(38, title);
    this.alignGrid.placeAtIndex(93, btnStart);

    this.emitter.on('start_game', this.startGame, this);
    this.choppa = this.add.sprite(0, 0, 'choppa');
    this.alignGrid.placeAtIndex(58, this.choppa);

    const frameNames = this.anims.generateFrameNames('choppa', {
      start: 0,
      end: 4,
      zeroPad: 4,
      prefix: 'Helicopter',
       suffix: '.png',
    });
    const config = {
      key: 'walk',
      frames: frameNames,
      frameRate: 20,
      repeat: -1,
    };

    const tween = this.tweens.add({
      targets: this.choppa,
      x: 400,
      ease: 'Power1',
      duration: 3000,
      yoyo: true,
      delay: 1000,
      repeat: -1,
    });

    const anim = this.anims.create(config);
    this.choppa.anims.load('walk');
    this.choppa.anims.play('walk');

  }

  startGame() {
  	console.log('hap')
    this.scene.start('SceneMain');
  }
  update() {
    this.choppa.angle++
  }
}

export {
  SceneTitle
}