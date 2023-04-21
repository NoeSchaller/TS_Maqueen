import {zone, wall, mark} from "./environnement/allEnvironnement"
import { MaqueenLite } from "./robot/maqueeLite";
import { MaqueenPlus } from "./robot/maqueenPlus";
import { Simulation } from "./simulation/simulation";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function load(scene: any) {}

function create(scene: any) {
  new MaqueenLite(scene, "N1", 0, 0, 0);

  new MaqueenPlus(scene, "N2", 200, 0, 0);

  new wall.Rectangle(scene, 0, -200, 100000, 10);
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
  await sleep(1000);

  sim.robots[0].motorLeft.setSpeed(1, 80);
  sim.robots[0].motorRight.setSpeed(1, 80);

  sim.robots[1].motorLeft.setSpeed(1, 76);
  sim.robots[1].motorRight.setSpeed(1, 76);
}

main();
