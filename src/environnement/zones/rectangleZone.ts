import * as type from "@type";

export class RectangleZone {
  protected scene: type.Scene;
  protected callback: Function;
  protected position: { x: number; y: number };
  protected scale: { x: number; y: number };
  protected angle: number;
  protected body: type.Rectangle;
  protected type: string;
  protected shape: string;

  constructor(
    scene: type.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    angle: number,
    callback: Function,
    color = 0xff0000,
    alpha = 0.3
  ) {
    this.type = "zone";
    this.shape = "rectangle";
    this.scene = scene;
    this.callback = callback;
    this.position = { x: x, y: y };
    this.scale = { x: 1, y: 1 };
    this.angle = angle;
    this.body = scene.matter.add
      .gameObject(scene.add.rectangle(x, y, width, height).setFillStyle(color, alpha), {isStatic: true, onCollideWith: 0, angle: angle})
      ;

    scene.zones.push(this);
  }

  public setPosition(x: number, y: number) {
    this.body.setPosition(x, y);
    this.position = { x: x, y: y };
  }

  public setAngle(deg: number) {
    this.body.setAngle(deg);
    this.angle = deg;
  }

  public setScale(x: number, y: number) {
    this.body.setAngle(0);
    this.body.setScale(x, y);
    this.body.setAngle(this.angle);
    this.scale = { x: x, y: y };
  }

  public update() {
    for (let i = 0; i < this.scene.robots.length; i++) {
      if (this.scene.matter.overlap(this.body, [this.scene.robots[i].body])) {
        this.callback(this.scene.robots[i], this);
      }
    }
  }
}
