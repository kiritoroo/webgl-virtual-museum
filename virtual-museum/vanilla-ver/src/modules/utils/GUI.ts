import { BladeApi, Pane } from 'tweakpane';
import * as EssentialsPlugin from '@tweakpane/plugin-essentials';
import { BladeController, View } from '@tweakpane/core';

interface FPSGraph extends BladeApi<BladeController<View>> {
  begin(): void
  end(): void
}

class GUI extends Pane {

  public fpsGraph: FPSGraph;

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
  }
}

export default GUI;