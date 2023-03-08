import * as Phaser from "phaser";
import { MaqueenLite } from "./robot/maqueeLite";
import { MaqueenPlus } from "./robot/maqueenPlus";

export type Scene = Phaser.Scene & {robots: Array<MaqueenLite | MaqueenPlus>}