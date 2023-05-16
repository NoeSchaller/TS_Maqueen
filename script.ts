import { connected } from "process";
import { mq } from "./src/merge";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mapLoad(scene) {
  scene.load.image("trail", "assets/trail.png");
}

function mapCreate(scene) {
  new mq.MaqueenLite(scene, "N°1", 0, 0, 0);
  new mq.Picture(scene, "trail", 0, 0).setScale(1.7, 1.7);
}

async function main() {
  let sim = new mq.Simulation(
    600,
    600,
    document.getElementById("simulation") as HTMLCanvasElement,
    mapLoad,
    mapCreate,
    0.5,
    false,
    false
  );

  await delay(500);
  const robot = sim.robots[0];

  setSpeed(30);
  while (true) {
    const vL = robot.pin13.read_digital(),
      vR = robot.pin14.read_digital();

    if (vL == 0 && vR == 0) {
      forward(robot);
    } else if (vL == 1 && vR == 0) {
      rightArc(robot, 0.1);
    } else if (vL == 0 && vR == 1) {
      leftArc(robot, 0.1);
    }
    await delay(100);
  }
}

main();
