import { WallCircle } from "./wall/wallCircle";
import { WallPolygone } from "./wall/wallPolygone";
import { WallRectangle } from "./wall/wallRectangle";
export const wall = {
    Circle: WallCircle,
    Rectangle: WallRectangle,
    Polygone: WallPolygone,
};
import { MarkCircle } from "./mark/markCircle";
import { MarkPolygone } from "./mark/markPolygone";
import { MarkRectangle } from "./mark/markRectangle";
import { Picture } from "./mark/picture";
export const mark = {
    Circle: MarkCircle,
    Rectangle: MarkRectangle,
    Polygone: MarkPolygone,
    Picture: Picture,
};
import { ZoneCircle } from "./zones/zoneCircle";
import { ZonePolygone } from "./zones/zonePolygone";
import { ZoneRectangle } from "./zones/zoneRectangle";
export const zone = {
    Circle: ZoneCircle,
    Rectangle: ZoneRectangle,
    Polygone: ZonePolygone,
};
