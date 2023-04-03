import * as type from "@type";
import { CircleMark } from "./environnement/mark/circleMark";
import { RectangleMark } from "./environnement/mark/rectangleMark";
import { CircleWall } from "./environnement/wall/circleWall";
import { RectangleWall } from "./environnement/wall/rectangleWall";
import { CircleZone } from "./environnement/zones/circleZone";
import { RectangleZone } from "./environnement/zones/rectangleZone";
import { MaqueenLite } from "./robot/maqueeLite";
import { MaqueenPlus } from "./robot/maqueenPlus";
import { Simulation } from "./simulation/simulation";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function load(scene: type.Scene) {}

function create(scene: type.Scene) {
  new MaqueenLite(scene, "N1", 500, 500, 60);

  new MaqueenPlus(scene, "N2", 400, 400, 45);

  new RectangleWall(scene, 50, 10, 200, 200, 60);
  new RectangleMark(scene, 100, 10, 200, 200, 60);
  new RectangleZone(scene, 50, 100, 200, 200, 60, function () {
    console.log("rectangleZone");
  });

  new CircleWall(scene, 100, 100, 50);
  new CircleMark(scene, 100, 500, 50);
  new CircleZone(scene, 100, 500, 50, function () {
    console.log("circleZone");
  });

  new RectangleMark(scene, 500, 100, 100, 100, 30);
}

async function main() {
  let sim = new Simulation(
    600,
    600,
    document.getElementById("game") as HTMLCanvasElement,
    load,
    create,
    0.8,
    true,
    true
  );
await sleep(1000)

}

main();
