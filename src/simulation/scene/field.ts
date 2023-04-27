import { MarkCircle } from "../../environnement/mark/markCircle";
import { MarkPolygone } from "../../environnement/mark/markPolygone";
import { MarkRectangle } from "../../environnement/mark/markRectangle";
import { Picture } from "../../environnement/mark/picture";
import { WallCircle } from "../../environnement/wall/wallCircle";
import { WallPolygone } from "../../environnement/wall/wallPolygone";
import { WallRectangle } from "../../environnement/wall/wallRectangle";
import { ZoneCircle } from "../../environnement/zones/zoneCircle";
import { ZonePolygone } from "../../environnement/zones/zonePolygone";
import { ZoneRectangle } from "../../environnement/zones/zoneRectangle";
import { MaqueenLite } from "../../robot/maqueeLite";
import { MaqueenPlus } from "../../robot/maqueenPlus";

export class Field extends Phaser.Scene {
  protected mapLoad: Function;
  protected mapCreate: Function;
  protected robots: Array<MaqueenLite | MaqueenPlus>;
  protected walls: Array<WallRectangle | WallCircle | WallPolygone>;
  protected marks: Array<MarkRectangle | MarkCircle | MarkPolygone | Picture>;
  protected zones: Array<ZoneRectangle | ZoneCircle | ZonePolygone>;
  protected RaycasterDomain: Array<MaqueenLite | MaqueenPlus>;
  protected mouse: boolean;
  constructor(
    robots: Array<MaqueenLite | MaqueenPlus>,
    walls: Array<WallRectangle | WallCircle | WallPolygone>,
    marks: Array<MarkRectangle | MarkCircle | MarkPolygone | Picture>,
    zones: Array<ZoneRectangle | ZoneCircle | ZonePolygone>,
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
