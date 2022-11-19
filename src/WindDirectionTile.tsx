import CompassDirection from "./CompassDirection";
import Typography from "@mui/joy/Typography";
import React from "react";
import { WindTrend } from "./Types";

type WindDirectionTileProps = {
  trend: WindTrend;
};
const WindDirectionTile = (props: WindDirectionTileProps) => {
  const { trend } = props;
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CompassDirection direction={trend.windDirection} />
      <Typography color={"info"}>{trend.windSpeed}</Typography>
      <Typography fontSize={"small"}>{trend.name}</Typography>
    </div>
  );
};

export default WindDirectionTile;
