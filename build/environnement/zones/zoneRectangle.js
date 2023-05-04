export class ZoneRectangle {
    constructor(scene, x, y, width, height, angle, callback, color = 0xff0000, alpha = 0.3) {
        this.type = "zone";
        this.shape = "rectangle";
        this.scene = scene;
        this.callback = callback;
        this.position = { x: x, y: y };
        this.scale = { x: 1, y: 1 };
        this.angle = angle;
        this.body = scene.matter.add
            .gameObject(scene.add.rectangle(x, y, width, height).setFillStyle(color, alpha), scene.matter.add.rectangle(x, y, width, height))
            .setCollidesWith(0);
        scene.zones.push(this);
    }
    setPosition(x, y) {
        this.body.setPosition(x, y);
        this.position = { x: x, y: y };
    }
    setAngle(deg) {
        this.body.setAngle(deg);
        this.angle = deg;
    }
    setScale(x, y) {
        this.body.setAngle(0);
        this.body.setScale(x, y);
        this.body.setAngle(this.angle);
        this.scale = { x: x, y: y };
    }
    update() {
        for (let i = 0; i < this.scene.robots.length; i++) {
            if (this.scene.matter.overlap(this.body, this.scene.robots[i].body)) {
                this.callback(this, this.scene.robots[i]);
            }
        }
    }
}
