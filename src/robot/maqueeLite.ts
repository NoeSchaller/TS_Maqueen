import * as type from "../type";
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
  readonly body: type.Sprite;
  public leftMotor: Motor;
  public rightMotor: Motor;
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
  constructor(
    scene: type.Scene,
    name: string,
    x: number,
    y: number,
    angle: number
  ) {
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
          { x: 12, y: 80 }
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

    this.leftMotor = new Motor(
      scene,
      this.body,
      -35,
      18,
      9,
      43,
      { x: -10, y: -4 },
      { x: -10, y: 40 },
      speedGrowth
    );

    this.rightMotor = new Motor(
      scene,
      this.body,
      35,
      18,
      9,
      43,
      { x: 10, y: -4 },
      { x: 10, y: 40 },
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
    this.leftMotor.update();
    this.rightMotor.update();
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
    this.leftMotor.wheel.setPosition(
      x +
        this.leftMotor.deltaOrigin *
          Math.cos(this.leftMotor.rotationOrigin + this.body.rotation),
      y +
        this.leftMotor.deltaOrigin *
          Math.sin(this.leftMotor.rotationOrigin + this.body.rotation)
    );
    this.rightMotor.wheel.setPosition(
      x +
        this.rightMotor.deltaOrigin *
          Math.cos(this.rightMotor.rotationOrigin + this.body.rotation),
      y +
        this.rightMotor.deltaOrigin *
          Math.sin(this.rightMotor.rotationOrigin + this.body.rotation)
    );
  }

  public setAngle(deg: number) {
    this.body.setAngle(deg);

    this.leftMotor.wheel.setPosition(
      this.body.x +
        this.leftMotor.deltaOrigin *
          Math.cos((deg / 180) * Math.PI + this.leftMotor.rotationOrigin),
      this.body.y +
        this.leftMotor.deltaOrigin *
          Math.sin((deg / 180) * Math.PI + this.leftMotor.rotationOrigin)
    );
    this.leftMotor.wheel.setAngle(deg);

    this.rightMotor.wheel.setPosition(
      this.body.x +
        this.rightMotor.deltaOrigin *
          Math.cos((deg / 180) * Math.PI + this.rightMotor.rotationOrigin),
      this.body.y +
        this.rightMotor.deltaOrigin *
          Math.sin((deg / 180) * Math.PI + this.rightMotor.rotationOrigin)
    );
    this.rightMotor.wheel.setAngle(deg);
  }
}
