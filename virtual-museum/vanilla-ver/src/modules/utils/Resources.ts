import Loader from './Loader';
import { EventEmitter } from 'events';

import { TAsset } from '@type/type';

class Resources extends EventEmitter {

  private loader: Loader;
  public items: any;
  private queue: number;
  private loaded: number;

  constructor(private readonly assets: Array<TAsset>) {
    super();

    this.loader = new Loader();
    this.items = {};
    this.queue = assets.length;
    this.loaded = 0;

    this.preload()
      .then(() => {
        console.log( '  ✔️: %c 100% Resources loaded  ', 'background: #1d2d44; color: #29bf12');
        console.log( '  💻: %c by Le Kien Trung       ', 'background: #1d2d44; color: #a2d2ff');
        console.log( '  💻: %c by Ho Xuan Hieu        ', 'background: #1d2d44; color: #a2d2ff');
        console.log(this.items);
        this.emit('e_res_ready');
      })
  }

  private async preload(): Promise<void> {
    for (const asset of this.assets) {
      if (asset.type === 'model') {
        await this.loader.LoaderModel( asset.path ).then((result) => {
          this.save(asset, result);
        })
      } else if (asset.type === 'hdr') {
        await this.loader.loaderHdr( asset.path ).then((result) => {
          this.save(asset, result);
        })
      } else if (asset.type === 'texture') {
        await this.loader.loaderTexture( asset.path ).then((result) => {
          this.save(asset, result);
        })
      }
    }
  }

  private save(asset: TAsset, result: any): void {
    this.items[asset.name] = result;
    this.loaded++;
    if (this.loaded === this.queue) {
      return;
    }
  }
}

export default Resources;