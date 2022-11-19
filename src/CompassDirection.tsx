import {WiDirectionUp} from "react-icons/wi";

export enum Direction  {
    NORTH= "N",
    NORTH_EAST= "NE",
    EAST= "E",
    SOUTH_EAST= "SE",
    SOUTH="S",
    SOUTH_WEST="SW",
    WEST="W",
    NORTH_WEST="NW",
}

type CompassDirectionProps = {
    direction: Direction
}
const CompassDirection = (props: CompassDirectionProps) => {
    const fontSize = 70
    let rotation = 0
    switch (props.direction) {
        case Direction.NORTH:
            rotation = 0;
            break;
        case Direction.NORTH_EAST:
            rotation = 45;
            break;
        case Direction.EAST:
            rotation = 90;
            break;
        case Direction.SOUTH_EAST:
            rotation = 135;
            break;
        case Direction.SOUTH:
            rotation = 180;
            break;
        case Direction.SOUTH_WEST:
            rotation = 225;
            break;
        case Direction.WEST:
            rotation = 270;
            break;
        case Direction.NORTH_WEST:
            rotation = 315;
            break;

    }
    return  <WiDirectionUp style={{transform: `rotate(${rotation}deg)`}} fontSize={fontSize}/>
}


export default CompassDirection
