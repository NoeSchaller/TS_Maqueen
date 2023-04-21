import { Led } from "../components/actuator/led";
import { Motor } from "../components/actuator/motor";
import { Infrared } from "../components/captor/infrared";
import { Ultrasonic } from "../components/captor/ultrasonic";
import { I2cLite } from "../components/controller/i2cLite";
import { Pin } from "../components/controller/pin";

export class MaqueenLite {
  public name: string;
  public type: string;
  protected angle: number;
  protected position: { x: number; y: number };
  readonly body: any;
  readonly zoneCollider: any;
  public motorLeft: Motor;
  public motorRight: Motor;
  public ultrasonic: Ultrasonic;
  public infraredLeft: Infrared;
  public infraredRight: Infrared;
  public ledLeft: Led;
  public ledRight: Led;
  public pin13: Pin;
  public pin14: Pin;
  public pin8: Pin;
  public pin12: Pin;
  public i2c: I2cLite;
  constructor(scene: any, name: string, x: number, y: number, angle: number) {
    //mise  en place de variables
    this.name = name;
    this.type = "maqueenLite";
    this.angle = angle;
    this.position = { x: x, y: y };
    //mise en place de l'élément body
    this.body = scene.matter.add
      .sprite(x, y, "liteBodyPic", undefined, {
        vertices: [
          { x: 12, y: 80 },
          { x: 70, y: 80 },
          { x: 70, y: 32 },
          { x: 80, y: 32 },
          { x: 80, y: 15 },
          { x: 62, y: 0 },
          { x: 20, y: 0 },
          { x: 0, y: 15 },
          { x: 0, y: 32 },
          { x: 12, y: 32 },
        ],
        frictionAir: 0,
        angle: angle,
      })
      .setOrigin(0.5, 0.5)
      .setDepth(2);

    //mise en place des moteurs
    let speedGrowth = function (power: number) {
      return (
        -9e-9 * power ** 4 +
        7e-6 * power ** 3 -
        0.0021 * power ** 2 +
        0.3121 * power -
        1.2
      );
    };

    this.motorLeft = new Motor(
      scene,
      this.body,
      -35,
      18,
      9,
      43,
      { x: 0, y: 0 },
      { x: 0, y: 40 },
      speedGrowth
    );

    this.motorRight = new Motor(
      scene,
      this.body,
      35,
      18,
      9,
      43,
      { x: 0, y: -1 },
      { x: 0, y: 40 },
      speedGrowth
    );

    //mise en place du capteur ultrason
    this.ultrasonic = new Ultrasonic(scene, this.body, 0, -35);

    //mise en place des capteurs infrarouges
    this.infraredLeft = new Infrared(scene, this.body, -7, -16, 2, false);

    this.infraredRight = new Infrared(scene, this.body, 7, -16, 2, false);

    //mise en place des leds
    this.ledLeft = new Led(scene, this.body, -18, -32);

    this.ledRight = new Led(scene, this.body, 18, -32);

    // mise en place des pins
    this.pin13 = new Pin(this.infraredLeft, "isMarked"); //irLeft
    this.pin14 = new Pin(this.infraredRight, "isMarked"); // irRight
    this.pin8 = new Pin(this.ledLeft, "getOn", "setOn"); //ledLeft
    this.pin12 = new Pin(this.ledRight, "getOn", "setOn"); // ledRight

    // mise en place de l'i2c
    this.i2c = new I2cLite(this);

    // ajout du robot à la liste des robots
    scene.robots.push(this);
  }

  public getDistance() {
    return this.ultrasonic.getDistance();
  }

  public update() {
    this.motorLeft.update();
    this.motorRight.update();
    this.ultrasonic.update();
    this.infraredLeft.update();
    this.infraredRight.update();
    this.ledLeft.update();
    this.ledRight.update();
    this.position = { x: this.body.x, y: this.body.y };
    this.angle = this.body.angle;
  }

  public setPosition(x: number, y: number) {
    this.body.setPosition(x, y);
    this.motorLeft.wheel.setPosition(
      x +
        this.motorLeft.deltaOrigin *
          Math.cos(this.motorLeft.rotationOrigin + this.body.rotation),
      y +
        this.motorLeft.deltaOrigin *
          Math.sin(this.motorLeft.rotationOrigin + this.body.rotation)
    );
    this.motorRight.wheel.setPosition(
      x +
        this.motorRight.deltaOrigin *
          Math.cos(this.motorRight.rotationOrigin + this.body.rotation),
      y +
        this.motorRight.deltaOrigin *
          Math.sin(this.motorRight.rotationOrigin + this.body.rotation)
    );
  }

  public setAngle(deg: number) {
    this.body.setAngle(deg);

    this.motorLeft.wheel.setPosition(
      this.body.x +
        this.motorLeft.deltaOrigin *
          Math.cos((deg / 180) * Math.PI + this.motorLeft.rotationOrigin),
      this.body.y +
        this.motorLeft.deltaOrigin *
          Math.sin((deg / 180) * Math.PI + this.motorLeft.rotationOrigin)
    );
    this.motorLeft.wheel.setAngle(deg);

    this.motorRight.wheel.setPosition(
      this.body.x +
        this.motorRight.deltaOrigin *
          Math.cos((deg / 180) * Math.PI + this.motorRight.rotationOrigin),
      this.body.y +
        this.motorRight.deltaOrigin *
          Math.sin((deg / 180) * Math.PI + this.motorRight.rotationOrigin)
    );
    this.motorRight.wheel.setAngle(deg);
  }
}
