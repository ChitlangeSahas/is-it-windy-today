import { Forecast, TempTrend } from "./types/Types";
import React from "react";
import { Button, Card } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import CompassDirection from "./CompassDirection";
import { Direction } from "./types/Types";
import { formatRelative } from "date-fns";
import "./ForecastMainTile.css";

type ForecastMainTileProps = {
  forecast: Forecast;
  oneDayTempTrendData: TempTrend[];
  onReset: () => void;
};

const ForecastMainTile = (props: ForecastMainTileProps) => {
  const { forecast, oneDayTempTrendData, onReset } = props;

  const deltaTemperatureForCurrentView =
    oneDayTempTrendData[forecast.number - 1].delta;

  const relativeTimeString = formatRelative(
    new Date(forecast.startTime),
    new Date()
  );
  return (
    <Card variant={"outlined"} className="per-hour-forecast-card">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Typography fontSize={"lg"} fontWeight={"bold"}>
            Tyson's Corner
          </Typography>
          <Typography fontSize={"lg"} fontWeight={"bold"}>
            {`${relativeTimeString
              .charAt(0)
              .toUpperCase()}${relativeTimeString.slice(1)}`}
          </Typography>
          <Typography fontSize="medium">{forecast.shortForecast}</Typography>
        </div>
        <div>
          <Typography level="h2">
            <span>
              {forecast.temperature}
              {"° "}
              {forecast.temperatureUnit}{" "}
            </span>
            {deltaTemperatureForCurrentView !== 0 && (
              <div
                style={{
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  fontSize={"medium"}
                  color={
                    deltaTemperatureForCurrentView > 0 ? "success" : "danger"
                  }
                >
                  <span>
                    {deltaTemperatureForCurrentView > 0
                      ? `+${deltaTemperatureForCurrentView}`
                      : deltaTemperatureForCurrentView}
                  </span>
                </Typography>
              </div>
            )}
          </Typography>
        </div>
      </div>

      <div className="wind-forecast-information">
        <div>
          <CompassDirection direction={forecast.windDirection as Direction} />
          <Typography level="h2">{forecast.windDirection}</Typography>
        </div>
        <Typography level="h4">{forecast.windSpeed}</Typography>
      </div>

      {
        <Button
          variant={"outlined"}
          className={"reset-button"}
          onClick={onReset}
          sx={{ visibility: forecast.number - 1 !== 0 ? "visible" : "hidden" }}
        >
          Reset
        </Button>
      }
    </Card>
  );
};

export default ForecastMainTile;
