import { BladeApi, Pane } from 'tweakpane';
import * as EssentialsPlugin from '@tweakpane/plugin-essentials';
import { BladeController, View } from '@tweakpane/core';
import Experience from '@core/Experience';

interface FPSGraph extends BladeApi<BladeController<View>> {
  begin(): void
  end(): void
}

class GUI extends Pane {

  public fpsGraph: FPSGraph;

  private experience: Experience = new Experience();

  constructor() {
    super();

    this.registerPlugin( EssentialsPlugin );

    this.fpsGraph = this.addBlade({
      view: 'fpsgraph',
      label: 'FPS'
    }) as FPSGraph

    this.init();
  }

  private init(): void {
    const PARAMS = {
      time: ''
    }

    const updateTime = () => {
      const matches = String(new Date()).match(/\d{2}:\d{2}:\d{2}/);
      PARAMS.time = (matches && matches[0]) ?? '';
    };

    window.setInterval(updateTime, 1000);
    updateTime();

    this.addMonitor(PARAMS, 'time', {
      label: 'Time',
      interval: 1000
    })

    this.addButton({
      title: 'Capture'
    }).on('click', () => {
      this.saveCanvas()
    })
  }

  private saveCanvas() {
    const renderer = this.experience.renderer;
    const canvasElem = renderer.renderer.domElement;
    const anchor = this.document.createElement('a');
    const date = new Date(Date.now())
    anchor.download = 'capture-' + date.getDate().toString().padStart(2, '0') + '' + date.getMonth().toString().padStart(2, '0') + '' + date.getFullYear() + '.png';
    anchor.href = canvasElem.toDataURL();
    anchor.click();
  }
}

export default GUI;