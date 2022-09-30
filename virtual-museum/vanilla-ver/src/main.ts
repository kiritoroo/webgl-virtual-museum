import Stage from "@core/Experience";
import Plugin from "@plugin/index";

import './style/style.css';

const container: HTMLCanvasElement = document.createElement('canvas');
document.body.appendChild(container);

new Stage(container);
new Plugin();