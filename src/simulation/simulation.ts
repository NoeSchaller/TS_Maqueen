import Phaser from "phaser";
import PhaserRaycaster from "phaser-raycaster";
import { CircleMark } from "../environnement/mark/circleMark";
import { PolygoneMark } from "../environnement/mark/polygoneMark";
import { RectangleMark } from "../environnement/mark/rectangleMark";
import { CircleWall } from "../environnement/wall/circleWall";
import { PolygoneWall } from "../environnement/wall/polygoneWall";
import { RectangleWall } from "../environnement/wall/rectangleWall";
import { CircleZone } from "../environnement/zones/circleZone";
import { PolygoneZone } from "../environnement/zones/polygoneZone";
import { RectangleZone } from "../environnement/zones/rectangleZone";
import { MaqueenLite } from "../robot/maqueeLite";
import { MaqueenPlus } from "../robot/maqueenPlus";
import { Field } from "./scene/field";
import { Overlay } from "./scene/overlay";

export class Simulation {
  public robots: Array<MaqueenLite | MaqueenPlus>;
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
