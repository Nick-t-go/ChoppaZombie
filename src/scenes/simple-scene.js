import {
  ScreenConfig,
} from '../classes/util/screenConfig';
import {
  AlignGrid,
} from '../classes/util/alignGrid';
import {
  FlatButton,
} from '../classes/ui/flatButton';

import {
  Controller,
} from '../classes/mc/controller';

import {
  MediaManager,
} from '../classes/util/mediaManager';

import {
  Constants,
} from '../constants';

import {
  Model,
} from '../classes/mc/model';

import {
  SoundButtons,
} from '../classes/ui/soundButtons';

import {
  Bar,
} from '../classes/components/bar';

class SimpleScene extends Phaser.Scene {

  constructor() {
    super('SceneMain');
  }

  create() {
    this.add.text(100, 100, 'Hello Phaser!', {
      fill: '#0f0',
    });
    let cokeCan = this.add.image(0, 0, 'cokecan');
    const gridConfig = {
      rows: 5,
      cols: 5,
      scene: this,
    };

    this.emitter = new Phaser.Events.EventEmitter();
    this.G = new Constants();
    this.model = new Model(this.emitter, this.G);
    this.controller = new Controller(this.emitter, this.G, this.model);

    this.mediaManager = new MediaManager({
      scene: this,
      model: this.model,
    });
    this.mediaManager.setBackgroundMusic('backgroundMusic');

    const fireText = {
      color: 'red',
      fontSize: 20,
    };

    const alignGrid = new AlignGrid(
      gridConfig, {
        height: ScreenConfig.height(),
        width: ScreenConfig.width(),
      },
    );
    alignGrid.showNumbers();
    alignGrid.placeAtIndex(16, cokeCan);
    let flatButton = new FlatButton({
      scene: this,
      key: 'button1',
      text: 'Fire',
      event: 'button_pressed',
      emitter: this.emitter,
      params: 'fire_lasers',
      textConfig: fireText,
    });
    let flatButton2 = new FlatButton({
      scene: this,
      key: 'button2',
      text: 'Destruct!',
      event: 'button_pressed',
      emitter: this.emitter,
      params: 'self_destruct',
    });
    this.sb = new SoundButtons(this, ScreenConfig.width());
    this.bar = new Bar({
      scene: this,
      x: 240,
      y: 330,
    });
    this.bar.setPercent(0.50)

    alignGrid.placeAtIndex(0, this.sb.musicToggle);
    alignGrid.placeAtIndex(4, this.sb.sfxToggle);
    alignGrid.placeAtIndex(7, flatButton);
    alignGrid.placeAtIndex(12, flatButton2);
    alignGrid.placeAtIndex(22, this.bar);

    this.emitter.on('button_pressed', this.buttonPressed, this);
  }

  buttonPressed(params) {
    switch (params) {
      case 'self_destruct':
        this.model.musicOn = !this.model.musicOn;
        break;
      case 'fire_lasers':
        this.scene.start('SceneOver');
        break;
      default:
        this.emitter.emit(this.G.PLAY_SOUND, 'cat');
        break;
    }
  }
}

export {
  SimpleScene
};