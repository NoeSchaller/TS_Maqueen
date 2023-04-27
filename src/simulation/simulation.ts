import Phaser from "phaser";
import PhaserRaycaster from "phaser-raycaster";
import { MarkCircle } from "../environnement/mark/markCircle";
import { MarkPolygone } from "../environnement/mark/markPolygone";
import { MarkRectangle } from "../environnement/mark/markRectangle";
import { WallCircle } from "../environnement/wall/wallCircle";
import { WallPolygone } from "../environnement/wall/wallPolygone";
import { WallRectangle } from "../environnement/wall/wallRectangle";
import { ZoneCircle } from "../environnement/zones/zoneCircle";
import { ZonePolygone } from "../environnement/zones/zonePolygone";
import { ZoneRectangle } from "../environnement/zones/zoneRectangle";
import { MaqueenLite } from "../robot/maqueeLite";
import { MaqueenPlus } from "../robot/maqueenPlus";
import { Picture } from "../environnement/mark/picture";
import { Field } from "./scene/field";
import { Overlay } from "./scene/overlay";

export class Simulation {
  public robots: any;
  public walls: Array<WallRectangle | WallCircle | WallPolygone>;
  public marks: Array<MarkRectangle | MarkCircle | MarkPolygone | Picture>;
  public zones: Array<ZoneRectangle | ZoneCircle | ZonePolygone>;
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
