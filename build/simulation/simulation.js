import Phaser from "phaser";
import PhaserRaycaster from "phaser-raycaster";
import { Field } from "./scene/field";
import { Overlay } from "./scene/overlay";
export class Simulation {
    constructor(width, height, canvas, mapLoad, mapCreate, zoom = 0.8, mouse = true, debug = false, background = 0x777777) {
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
                new Field(this.robots, this.walls, this.marks, this.zones, mapLoad, mapCreate, mouse),
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
