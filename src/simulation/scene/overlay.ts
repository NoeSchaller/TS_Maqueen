import { MaqueenLite } from "../../robot/maqueeLite";
import { MaqueenPlus } from "../../robot/maqueenPlus";

export class Overlay extends Phaser.Scene {
  protected height: number;
  protected initZoom: number;
  public robots: Array<MaqueenLite | MaqueenPlus>;
  protected camera: any;
  protected buttons: any[];
  protected echelle: any;
  protected cursor?: any;
  protected keyboardControl?: boolean;

  constructor(height: number, zoom: number) {
    super("overlay");
    this.height = height;
    this.initZoom = zoom;
    this.robots = [];
    this.camera = [];
    this.buttons = [];
  }

  public init(data: Array<any>) {
    this.robots = data[0];
    this.camera = data[1];
  }

  public preload() {
    this.load.image("echelle", "assets/scale.png");
  }

  public create() {
    this.echelle = this.add
      .image(70, this.height - 30, "echelle")
      .setScale(this.initZoom);
    this.camera.zoom = this.initZoom;

    this.add
      .text(10, 60, "-", {
        color: "#000",
        backgroundColor: "#fff",
        padding: { left: 3, right: 3, top: 3, bottom: 3 },
        fontSize: "30px",
      })
      .setInteractive()
      .on("pointerdown", () => {
        (this.camera.zoom /= 1.2), (this.echelle.scale /= 1.2);
      });

    this.add
      .text(10, 10, "+", {
        color: "#000",
        backgroundColor: "#fff",
        padding: { left: 3, right: 3, top: 3, bottom: 3 },
        fontSize: "30px",
      })
      .setInteractive()
      .on("pointerdown", () => {
        (this.camera.zoom *= 1.2), (this.echelle.scale *= 1.2);
      });

    this.buttons.push(
      this.add
        .text(10, 110, "Free", {
          color: "#000",
          backgroundColor: "#999",
          padding: { left: 3, right: 3, top: 3, bottom: 3 },
        })
        .setInteractive()
        .on("pointerdown", () => {
          this.keyboardControl = true;
          this.cursor.setPosition(15 + this.buttons[0].width, 110);
          this.camera.stopFollow();
        })
    );

    for (let i = 0; i < this.robots.length; i++) {
      this.buttons.push(
        this.add
          .text(10, 140 + 30 * i, this.robots[i].name, {
            color: "#000",
            backgroundColor: "#999",
            padding: { left: 3, right: 3, top: 3, bottom: 3 },
          })
          .setInteractive()
          .on("pointerdown", () => {
            this.keyboardControl = false;
            this.cursor.setPosition(
              15 + this.buttons[i + 1].width,
              140 + 30 * i
            );
            this.camera.startFollow(this.robots[i].body);
          })
      );
    }

    this.cursor = this.add.text(0, 0, "<=", { color: "#000", fontSize: "20px" });

    if (this.robots.length == 0) {
      this.keyboardControl = true;
      this.cursor.setPosition(15 + this.buttons[0].width, 113);
    } else {
      this.keyboardControl = false;
      this.cursor.setPosition(15 + this.buttons[1].width, 140);
      this.camera.startFollow(this.robots[0].body);
    }
  }

  public update() {
    if (this.keyboardControl && this.input.keyboard != null) {
      this.input.keyboard.addKeys({
        up: "up",
        down: "down",
        left: "left",
        right: "right"
      });

      if (this.input.keyboard.keys[38].isDown) {
        this.camera.scrollY -= 5 / this.camera.zoom;
      } else if (this.input.keyboard.keys[40].isDown) {
        this.camera.scrollY += 5 / this.camera.zoom;
      }

      if (this.input.keyboard.keys[37].isDown) {
        this.camera.scrollX -= 5 / this.camera.zoom;
      } else if (this.input.keyboard.keys[39].isDown) {
        this.camera.scrollX += 5 / this.camera.zoom;
      }
    }
  }
}
