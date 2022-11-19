import Typography from "@mui/joy/Typography";
import WindDirectionTile from "./WindDirectionTile";
import { Card, Link } from "@mui/joy";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import React, { useState } from "react";
import { Forecast, TempTrend } from "./types/Types";
import "./ForecastTrendsSection.css";
import { format } from "date-fns";

type ForecastTrendsSectionProps = {
  forecastByHour: Forecast[];
  temperatureTrendData: TempTrend[];
};

const ForecastTrendsSection = (props: ForecastTrendsSectionProps) => {
  const [displayTwentyFourHourWind, setDisplayTwentyFourHourWind] =
    useState(false);

  const { forecastByHour, temperatureTrendData } = props;

  const getWindTrendData = () => {
    return forecastByHour.map((forecast) => {
      return {
        name: `${format(new Date(forecast.startTime), "h a")}`,
        windSpeed: forecast.windSpeed,
        windDirection: forecast.windDirection,
      };
    });
  };
  return (
    <Card variant={"outlined"} className={"trends-card"}>
      <Typography sx={{ mt: 1 }} fontSize={"lg"}>
        Wind trend ({displayTwentyFourHourWind ? "24h" : "12h"})
      </Typography>

      <div>
        {getWindTrendData()
          .slice(0, 12)
          .map((trend: any) => {
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
        <div className={"wind-trend-12h"}>
          {getWindTrendData()
            .slice(13, 25)
            .map((trend: any) => {
              return <WindDirectionTile trend={trend} key={trend.name} />;
            })}
        </div>
      )}

      <Typography sx={{ mt: 2 }} fontSize={"lg"}>
        Temperature trend (24h)
      </Typography>

      <LineChart
        width={850}
        height={200}
        data={temperatureTrendData}
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
  );
};

export default ForecastTrendsSection;
