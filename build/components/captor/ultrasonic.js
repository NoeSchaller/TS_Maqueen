export class Ultrasonic {
    constructor(scene, reference, x, y, angle = 0, range = 255, coneAngle = 60) {
        this.reference = reference;
        this.scene = scene;
        this.range = range;
        this.angle = (angle / 180) * Math.PI;
        this.deltaOrigin = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        this.rotationOrigin = Math.atan2(y, x);
        this.raycaster = scene.raycasterPlugin.createRaycaster();
        this.raycaster.mapGameObjects(scene.RaycasterDomain);
        this.rayCone = this.raycaster
            .createRay({
            origin: {
                x: reference.x + x,
                y: reference.y + y,
            },
            autoSlice: true,
            collisionRange: range * 10,
        })
            .setConeDeg(coneAngle)
            .setAngle(reference.rotation + Math.PI / 2 + this.angle);
        this.rayCone.enablePhysics("matter");
        this.raycaster.mapGameObjects(scene.RaycasterDomain);
    }
    getDistance() {
        let intersections = [];
        let distances = [];
        let distance;
        this.raycaster.mapGameObjects(this.scene.RaycasterDomain);
        intersections = this.rayCone.castCone();
        for (let i = 0; i < intersections.length; i++) {
            distance = Math.sqrt(Math.pow((intersections[i].x - this.rayCone.origin.x), 2) +
                Math.pow((intersections[i].y - this.rayCone.origin.y), 2));
            distances.push(Math.round(distance));
        }
        let min = Math.min(...distances);
        if (min < this.range * 10) {
            return Math.round(min / 10);
        }
        else {
            return this.range;
        }
    }
    update() {
        this.rayCone
            .setOrigin(this.reference.x +
            this.deltaOrigin *
                Math.cos(this.reference.rotation + this.rotationOrigin), this.reference.y +
            this.deltaOrigin *
                Math.sin(this.reference.rotation + this.rotationOrigin))
            .setAngle(this.reference.rotation - Math.PI / 2 + this.angle);
    }
}
