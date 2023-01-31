import { CircleMark } from "../../environnement/mark/circleMark";
import { PolygoneMark } from "../../environnement/mark/polygoneMark";
import { RectangleMark } from "../../environnement/mark/rectangleMark";
import { CircleWall } from "../../environnement/wall/circleWall";
import { PolygoneWall } from "../../environnement/wall/polygoneWall";
import { RectangleWall } from "../../environnement/wall/rectangleWall";
import { CircleZone } from "../../environnement/zones/circleZone";
import { PolygoneZone } from "../../environnement/zones/polygoneZone";
import { RectangleZone } from "../../environnement/zones/rectangleZone";
import { MaqueenLite } from "../../robot/maqueeLite";
import { MaqueenPlus } from "../../robot/maqueenPlus";

export class Field extends Phaser.Scene {
  protected mapLoad: Function;
  protected mapCreate: Function;
  protected robots: Array<MaqueenLite | MaqueenPlus>;
  protected walls: Array<RectangleWall | CircleWall | PolygoneWall>;
  protected marks: Array<RectangleMark | CircleMark | PolygoneMark>;
  protected zones: Array<RectangleZone | CircleZone | PolygoneZone>;
  protected RaycasterDomain: Array<MaqueenLite | MaqueenPlus>;
  protected mouse: boolean;
  constructor(
    robots: Array<MaqueenLite | MaqueenPlus>,
    walls: Array<RectangleWall | CircleWall | PolygoneWall>,
    marks: Array<RectangleMark | CircleMark | PolygoneMark>,
    zones: Array<RectangleZone | CircleZone | PolygoneZone>,
    mapLoad: Function,
    mapCreate: Function,
    mouse: boolean
  ) {
    super("field");
    this.mapLoad = mapLoad;
    this.mapCreate = mapCreate;
    this.robots = robots;
    this.walls = walls;
    this.marks = marks;
    this.zones = zones;
    this.mouse = mouse;
    this.RaycasterDomain = [];
  }

  public preload() {
    this.load.json("liteShape", "assets/liteShape.json");
    this.load.json("plusShape", "assets/plusShape.json");

    this.load.spritesheet("liteBodyPic", "assets/liteBody.png", {
      frameWidth: 80,
      frameHeight: 80,
    });
    this.load.spritesheet("plusBodyPic", "assets/plusBody.png", {
      frameWidth: 100,
      frameHeight: 103,
    });

    this.mapLoad(this);
  }

  public create() {
    this.mapCreate(this);

    if (this.mouse) {
      this.matter.add.mouseSpring({ stiffness: 0.001 });
    }

    this.scene.launch("overlay", [this.robots, this.cameras.main]);
  }

  public update() {
    for (let i = 0; i < this.zones.length; i++) {
      this.zones[i].update();
    }

    for (let i = 0; i < this.robots.length; i++) {
      this.robots[i].update();
    }
  }
}
