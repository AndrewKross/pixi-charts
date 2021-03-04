import * as PIXI from 'pixi.js'
import { lines, Settings } from "./settings";

const app = new PIXI.Application({
  width: Settings.SCREEN_WIDTH,
  height: (Math.ceil(lines.length / Settings.COLUMNS_NUMBER) * Settings.FIELD_HEIGHT_WITH_MARGIN),
  backgroundColor: 0xedbebe
});

const getRandomColor = () => Math.floor(Math.random()*16777215)

let Graphics = PIXI.Graphics
let lastRectangle = { x: 0 }
let marginX = 0
let marginY = 0

lines.map((coords) => {
  if (lastRectangle.x < Settings.FIELD_WIDTH_WITH_MARGIN * (Settings.COLUMNS_NUMBER - 1)) {
    marginX = lastRectangle.x === 0 ? 0 : marginX + Settings.FIELD_WIDTH_WITH_MARGIN
  } else {
    marginX = 0
    marginY += Settings.FIELD_HEIGHT_WITH_MARGIN
  }

  for (let line = 0; line < Settings.BLOCKS_LINES; line++) {
    for (let column = 0; column < Settings.BLOCKS_COLUMNS; column++) {
      let rectangle = new Graphics()
      rectangle.lineStyle(2, 0x000000, 1)
      rectangle.beginFill(0x66ccff, 0)
      rectangle.drawRect(0, 0, Settings.BLOCK_SIZE, Settings.BLOCK_SIZE)
      rectangle.endFill()
      rectangle.x = 1 + marginX + column * Settings.BLOCK_SIZE
      rectangle.y = 1 + marginY + line * Settings.BLOCK_SIZE
      app.stage.addChild(rectangle)
      lastRectangle = rectangle
    }
  }

  let line = new Graphics()
  line.lineStyle(4, getRandomColor(), 1)

  coords.map((y, x) => {
    if (x === 0) {
      line.moveTo((Settings.BLOCK_SIZE / 2) + marginX,
        (Settings.BLOCK_SIZE / 2) + marginY + Settings.BLOCK_SIZE * y)
    } else {
      line.lineTo((Settings.BLOCK_SIZE / 2) + marginX + Settings.BLOCK_SIZE * x,
        (Settings.BLOCK_SIZE / 2) + marginY + Settings.BLOCK_SIZE * y)
    }
  })

  line.x = 0
  line.y = 0
  app.stage.addChild(line)
})

document.body.appendChild(app.view);
