import { Motor } from "../components/actuator/motor";
import { RgbLed } from "../components/actuator/rgbLed";
import { Infrared } from "../components/captor/infrared";
import { Ultrasonic } from "../components/captor/ultrasonic";
import { I2cPlus } from "../components/controller/i2cPlus";

export class MaqueenPlus {
  public name: string;
  public type: string;
  protected angle: number;
  protected position: { x: number; y: number };
  readonly body: any;
  readonly zoneCollider: any;
  readonly motorLeft: Motor;
  readonly motorRight: Motor;
  protected ultrasonic: Ultrasonic;
  readonly infraredLeft1: Infrared;
  readonly infraredLeft2: Infrared;
  readonly infraredLeft3: Infrared;
  readonly infraredRight1: Infrared;
  readonly infraredRight2: Infrared;
  readonly infraredRight3: Infrared;
  readonly ledLeft: RgbLed;
  readonly ledRight: RgbLed;
  public i2c: I2cPlus;

  constructor(scene: any, name: string, x: number, y: number, angle: number) {
    //mise  en place de variables
    this.name = name;
    this.type = "maqueenPlus";
    this.angle = angle;
    this.position = { x: x, y: y };

    //mise en place de l'élément body
    this.body = scene.matter.add
      .sprite(x, y, "plusBodyPic", undefined, {
        vertices: [
          { x: 12, y: 103 },
          { x: 88, y: 103 },
          { x: 88, y: 55 },
          { x: 100, y: 55 },
          { x: 100, y: 35 },
          { x: 73, y: 0 },
          { x: 27, y: 0 },
          { x: 0, y: 35 },
          { x: 0, y: 55 },
          { x: 12, y: 55 },
        ],
        frictionAir: 0,
        angle: angle/360*(2*Math.PI),

      })
      .setOrigin(0.5, 0.5)
      .setDepth(2);

    //mise en place des moteurs
    let speedGrowth = function (power: number) {
      return (
        -1e-8 * power ** 4 +
        1e-5 * power ** 3 -
        0.0032 * power ** 2 +
        0.4053 * power -
        2.8394
      );
    };
    this.motorLeft = new Motor(
      scene,
      this.body,
      -45,
      27,
      9,
      43,
      { x: -10, y: 0 },
      { x: -10, y: 49 },
      speedGrowth
    );

    this.motorRight = new Motor(
      scene,
      this.body,
      45,
      27,
      9,
      43,
      { x: 10, y: -9 },
      { x: 10, y: 49 },
      speedGrowth
    );

    //mise en place du capteur ultrason
    this.ultrasonic = new Ultrasonic(scene, this.body, 0, -21);

    //mise en place des capteurs infrarouges
    this.infraredLeft1 = new Infrared(scene, this.body, -5, -31);

    this.infraredLeft2 = new Infrared(scene, this.body, -15, -31);

    this.infraredLeft3 = new Infrared(scene, this.body, -45, -11);

    this.infraredRight1 = new Infrared(scene, this.body, 5, -31);

    this.infraredRight2 = new Infrared(scene, this.body, 15, -31);

    this.infraredRight3 = new Infrared(scene, this.body, 45, -11);

    //mise en place des leds rgb
    this.ledLeft = new RgbLed(scene, this.body, -20, -45);

    this.ledRight = new RgbLed(scene, this.body, 20, -45);

    //mise en place de l'i2c
    this.i2c = new I2cPlus(this);

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
    this.infraredLeft1.update();
    this.infraredLeft2.update();
    this.infraredLeft3.update();
    this.infraredRight1.update();
    this.infraredRight2.update();
    this.infraredRight3.update();
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
