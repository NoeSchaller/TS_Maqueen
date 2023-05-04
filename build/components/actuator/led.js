export class Led {
    constructor(scene, reference, x, y, radius = 4) {
        this.reference = reference;
        this.on = false;
        this.deltaOrigin = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        this.rotationOrigin = Math.atan2(y, x);
        this.led = scene.add
            .circle(reference.x + x, reference.y + y, radius, 0x7a0000)
            .setDepth(2);
    }
    setOn(bool) {
        this.on = bool;
    }
    getOn() {
        return this.on;
    }
    update() {
        this.led.setPosition(this.reference.x +
            this.deltaOrigin *
                Math.cos(this.reference.rotation + this.rotationOrigin), this.reference.y +
            this.deltaOrigin *
                Math.sin(this.reference.rotation + this.rotationOrigin));
        if (this.on) {
            this.led.fillColor = 0xff0000;
        }
        else {
            this.led.fillColor = 0x7a0000;
        }
    }
}