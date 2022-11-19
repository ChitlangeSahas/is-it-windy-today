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
import TemperatureTrendChart from "./TemperatureTrendChart";

type ForecastTrendsSectionProps = {
  forecastByHour: Forecast[];
  temperatureTrendData: TempTrend[];
  currentForecastBeingViewed: number;
};

const ForecastTrendsSection = (props: ForecastTrendsSectionProps) => {
  const [displayTwentyFourHourWind, setDisplayTwentyFourHourWind] =
    useState(false);

  const { forecastByHour, temperatureTrendData, currentForecastBeingViewed } = props;

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
          .map((trend: any, index) => {
            return <WindDirectionTile trend={trend} key={trend.name} isViewing={currentForecastBeingViewed === index}/>;
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
            .slice(12, 24)
            .map((trend: any, index) => {
              return <WindDirectionTile trend={trend} key={trend.name} isViewing={currentForecastBeingViewed === index+12}/>;
            })}
        </div>
      )}

      <Typography sx={{ mt: 2 }} fontSize={"lg"}>
        Temperature trend (24h)
      </Typography>


      <TemperatureTrendChart temperatureTrendData={temperatureTrendData}/>
    </Card>
  );
};

export default ForecastTrendsSection;
