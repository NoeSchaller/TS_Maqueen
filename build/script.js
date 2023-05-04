import { mq } from "./merge";


function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function load(scene) {
  scene.load.image("yes", "/itWork.jpg");
}
function create(scene) {
  new mq.MaqueenLite(scene, "N1", 0, 0, 90);
  new mq.MaqueenPlus(scene, "N2", 200, 0, 90);
  new mq.Picture(scene, "yes", 100, -2000).setAngle(90);
}
async function main() {
  let sim = new mq.Simulation(
    600,
    600,
    document.getElementById("game"),
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