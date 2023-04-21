import Phaser from "phaser";
import PhaserRaycaster from "phaser-raycaster";
import { CircleMark } from "../environnement/mark/markCircle";
import { PolygoneMark } from "../environnement/mark/markPolygone";
import { RectangleMark } from "../environnement/mark/markRectangle";
import { CircleWall } from "../environnement/wall/wallCircle";
import { PolygoneWall } from "../environnement/wall/wallPolygone";
import { RectangleWall } from "../environnement/wall/wallRectangle";
import { CircleZone } from "../environnement/zones/zoneCircle";
import { PolygoneZone } from "../environnement/zones/zonePolygone";
import { RectangleZone } from "../environnement/zones/zoneRectangle";
import { MaqueenLite } from "../robot/maqueeLite";
import { MaqueenPlus } from "../robot/maqueenPlus";
import { Field } from "./scene/field";
import { Overlay } from "./scene/overlay";

export class Simulation {
  public robots: any;
  public walls: Array<RectangleWall | CircleWall | PolygoneWall>;
  public marks: Array<RectangleMark | CircleMark | PolygoneMark>;
  public zones: Array<RectangleZone | CircleZone | PolygoneZone>;
  protected game: Phaser.Game;
  public constructor(
    width: number,
    height: number,
    canvas: HTMLCanvasElement,
    mapLoad: Function,
    mapCreate: Function,
    zoom: number = 0.8,
    mouse: boolean = true,
    debug: boolean = false,
    background: number = 0x777777
  ) {
    this.robots = [];
    this.walls = [];
    this.marks = [];
    this.zones = [];
    this.game = new Phaser.Game({
      width: width,
      height: height,
      backgroundColor: background,
      type: Phaser.WEBGL,
      canvas: canvas,
      scene: [
        new Field(
          this.robots,
          this.walls,
          this.marks,
          this.zones,
          mapLoad,
          mapCreate,
          mouse
        ),
        new Overlay(height, zoom),
      ],
      physics: {
        default: "matter",
        matter: {
          gravity: { y: 0, x: 0 },
          debug: debug,
        },
      },
      plugins: {
        scene: [
          {
            key: "PhaserRaycaster",
            plugin: PhaserRaycaster,
            mapping: "raycasterPlugin",
          },
        ],
      },
    });
  }
}
