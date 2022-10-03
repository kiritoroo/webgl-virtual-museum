import Stage from "@core/Experience";
import Addon from "@addon/index";

import './styles/style.css';

const container: HTMLCanvasElement = document.createElement('canvas');
document.body.appendChild(container);

new Stage(container).resources.on('e_res_ready', () => {
  new Addon();
});