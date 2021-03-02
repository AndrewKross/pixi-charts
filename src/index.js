import * as PIXI from 'pixi.js'
import { lines, Settings } from "./settings";

const app = new PIXI.Application({
  width: 1280,
  height: 640,
  backgroundColor: 0xedbebe
});

document.body.appendChild(app.view);

let Graphics = PIXI.Graphics

for (let line = 0; line < Settings.BLOCKS_LINES; line++) {
  for (let column = 0; column < Settings.BLOCKS_COLUMNS; column++) {
    let rectangle = new Graphics()
    rectangle.lineStyle(2, 0x000000, 1)
    rectangle.beginFill(0x66ccff, 0)
    rectangle.drawRect(0,0,50,50)
    rectangle.endFill()
    rectangle.x = 1 + column * Settings.BLOCK_SIZE
    rectangle.y = 1 + line * Settings.BLOCK_SIZE
    app.stage.addChild(rectangle)
  }
}

const coords = [2, 1, 0, 0, 1, 2]

let line = new Graphics()
line.lineStyle(2, 0xffffff, 1)

coords.map((y, idx) => {
  if (idx === 0) {
    line.moveTo(25, 25 * (1 + y))
  } else {
    line.lineTo(25 + Settings.BLOCK_SIZE * idx,25 + Settings.BLOCK_SIZE * y)
  }
})

line.x = 0
line.y = 0
app.stage.addChild(line)
