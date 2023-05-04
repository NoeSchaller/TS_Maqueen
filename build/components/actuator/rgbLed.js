export class RgbLed {
    constructor(scene, reference, x, y, radius = 5) {
        this.reference = reference;
        this.color = 0x808080;
        this.deltaOrigin = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        this.rotationOrigin = Math.atan2(y, x);
        this.led = scene.add
            .circle(reference.x + x, reference.y + y, radius, 0x808080)
            .setDepth(2);
    }
    setColor(color) {
        this.color = color;
    }
    update() {
        this.led.setPosition(this.reference.x +
            this.deltaOrigin *
                Math.cos(this.reference.rotation + this.rotationOrigin), this.reference.y +
            this.deltaOrigin *
                Math.sin(this.reference.rotation + this.rotationOrigin));
        this.led.fillColor = this.color;
    }
}
