import { Forecast } from "./Types";
import React, { useState } from "react";
import { Card, Divider, Link } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import CompassDirection from "./CompassDirection";
import { Direction } from "./Types";
import {formatRelative} from 'date-fns'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import WindDirectionTile from "./WindDirectionTile";

type ForecastMainTileProps = {
  forecast: Forecast;
  oneDayTempTrendData: any;
  oneDayWindTrendData: any;
};

const ForecastMainTile = (props: ForecastMainTileProps) => {
  const { forecast, oneDayWindTrendData, oneDayTempTrendData } = props;
  const [displayTwentyFourHourWind, setDisplayTwentyFourHourWind] =
    useState(false);

  const deltaTemperatureForCurrentView =
    oneDayTempTrendData[forecast.number - 1].delta;

  const relativeTimeString = formatRelative(new Date(forecast.startTime), new Date())
  return (
    <>
      <Card variant={"outlined"}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Typography fontSize={"lg"} fontWeight={"bold"}>
              {`${relativeTimeString.charAt(0).toUpperCase()}${relativeTimeString.slice(1)}` }
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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            marginTop: "12px",
          }}
        >
          <div>
            <CompassDirection direction={forecast.windDirection as Direction} />
            <Typography level="h2">{forecast.windDirection}</Typography>
          </div>
          <Typography level="h4">{forecast.windSpeed}</Typography>
        </div>

        <Divider sx={{ mt: 6 }} />

        <Typography sx={{ mt: 3 }} fontSize={"lg"}>
          Wind trend ({displayTwentyFourHourWind ? "24h" : "12h"})
        </Typography>

        <div>
          {oneDayWindTrendData.slice(0, 12).map((trend: any) => {
            return <WindDirectionTile trend={trend} key={trend.name} />;
          })}
        </div>

        {!displayTwentyFourHourWind && (
          <Link
            onClick={() => setDisplayTwentyFourHourWind(true)}
            sx={{ alignSelf: "flex-end", mt: 2, mr: 1 }}
          >
            View more
          </Link>
        )}
        {displayTwentyFourHourWind && (
          <div>
            {oneDayWindTrendData.slice(13, 25).map((trend: any) => {
              return <WindDirectionTile trend={trend} key={trend.name} />;
            })}
          </div>
        )}

        <Typography sx={{ mt: 3 }} fontSize={"lg"}>
          Temperature trend (24h)
        </Typography>

        <LineChart
          width={850}
          height={200}
          data={props.oneDayTempTrendData}
          margin={{
            top: 30,
            right: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temp" stroke="green" />
          <Line type="monotone" dataKey="delta" stroke="orange" />
        </LineChart>
      </Card>
    </>
  );
};

export default ForecastMainTile;
