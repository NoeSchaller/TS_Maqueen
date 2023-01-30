
import { CircleMark } from "./src/environnement/mark/circleMark";
import { RectangleMark } from "./src/environnement/mark/rectangleMark";
import { CircleWall } from "./src/environnement/wall/circleWall";
import { RectangleWall } from "./src/environnement/wall/rectangleWall";
import { CircleZone } from "./src/environnement/zones/circleZone";
import { RectangleZone } from "./src/environnement/zones/rectangleZone";
import { MaqueenLite } from "./src/robot/maqueeLite";
import { MaqueenPlus } from "./src/robot/maqueenPlus";
import { Simulation } from "./src/simulation/simulation";

function load(scene: any) {}

function create(scene: any) {
  new MaqueenLite(scene, "N1", 500, 500, 60);

  new MaqueenPlus(scene, "N2", 400, 400, 45);

  new RectangleWall(scene, 50, 10, 200, 200, 60);
  new RectangleMark(scene, 100, 10, 200, 200, 60);
  new RectangleZone(scene, 50, 100, 200, 200, 60, function () {
    console.log('rectangleZone')
  });

  new CircleWall(scene, 100, 100, 50);
  new CircleMark(scene, 100, 500, 50);
  new CircleZone(scene, 100, 500, 50, function () {
    console.log("circleZone");
  });

  new RectangleMark(scene, 500, 100, 100, 100, 30);
}

new Simulation(
  600,
  600,
  document.getElementById("game") as HTMLCanvasElement,
  load,
  create
);

console.log(1)
