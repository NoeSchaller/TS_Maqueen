import { type } from "os";
import * as Phaser from "phaser";
import { CircleZone } from "./environnement/zones/circleZone";
import { PolygoneZone } from "./environnement/zones/polygoneZone";
import { RectangleZone } from "./environnement/zones/rectangleZone";
import { MaqueenLite } from "./robot/maqueeLite";
import { MaqueenPlus } from "./robot/maqueenPlus";

export type Scene = Phaser.Scene & {
  robots: Array<MaqueenLite | MaqueenPlus>;
  zones: Array<CircleZone | PolygoneZone | RectangleZone>;
};
export type Sprite = Phaser.Physics.Matter.Sprite;
export type Rectangle = Phaser.GameObjects.GameObject | Phaser.Physics.Matter.Image
