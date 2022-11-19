import CompassDirection from "./CompassDirection";
import Typography from "@mui/joy/Typography";
import React from "react";
import { WindTrend } from "./types/Types";

type WindDirectionTileProps = {
  trend: WindTrend;
  isViewing: boolean
};
const WindDirectionTile = (props: WindDirectionTileProps) => {
  const { trend , isViewing} = props;
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        outline: isViewing ? 'gray dashed 1px' : 'none',
        borderRadius: '4px',
        paddingBottom: '2px'
      }}
    >
      <CompassDirection direction={trend.windDirection} />
      <Typography color={"info"}>{trend.windSpeed}</Typography>
      <Typography fontSize={"small"}>{trend.name}</Typography>
    </div>
  );
};

export default WindDirectionTile;
