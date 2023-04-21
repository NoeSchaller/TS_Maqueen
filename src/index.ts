import { MarkCircle } from "./environnement/mark/markCircle";
import { MarkPolygone } from "./environnement/mark/markPolygone";
import { Picture } from "./environnement/mark/picture";
import { WallCircle } from "./environnement/wall/wallCircle";
import { WallPolygone } from "./environnement/wall/wallPolygone";
import { WallRectangle } from "./environnement/wall/wallRectangle";
import { ZoneCircle } from "./environnement/zones/zoneCircle";
import { ZonePolygone } from "./environnement/zones/zonePolygone";
import { ZoneRectangle } from "./environnement/zones/zoneRectangle";
import { MaqueenLite } from "./robot/maqueeLite";
import { MaqueenPlus } from "./robot/maqueenPlus";
import { Simulation } from "./simulation/simulation";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function load(scene: any) {
  scene.load.image("yes", "/itWork.jpg");
}

function create(scene: any) {
  new MaqueenLite(scene, "N1", 0, 0, 90);

  new MaqueenPlus(scene, "N2", 200, 0, 90);

  new Picture(scene, "yes", 100, -2000).setAngle(90);
}

async function main() {
  let sim = new Simulation(
    600,
    600,
    document.getElementById("game") as HTMLCanvasElement,
    load,
    create,
    0.8,
    false,
    false
  );
  await sleep(1000);

  sim.robots[0].motorLeft.setSpeed(1, 80);
  sim.robots[0].motorRight.setSpeed(1, 80);

  sim.robots[1].motorLeft.setSpeed(1, 76);
  sim.robots[1].motorRight.setSpeed(1, 76);

    await sleep(2000)

  console.log(sim.robots[0].angle)
}

main();
