import React, { useEffect, useState } from "react";
import "./App.css";
import { CssVarsProvider } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import axios from "axios";
import ForecastMainTile from "./ForecastMainTile";
import { CircularProgress, IconButton, Link } from "@mui/joy";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Forecast, TempTrend } from "./Types";
import Typography from "@mui/joy/Typography";
import WindDirectionTile from "./WindDirectionTile";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ForecastTrendsSection from "./ForecastTrendsSection";

export default function App() {
  const [dataHasLoaded, setDataHasLoaded] = useState(false);
  const getForecastData = () => {
    axios
      .get("https://api.weather.gov/gridpoints/LWX/89,70/forecast/hourly")
      .then((response) => {
        setForcastsByHour(response.data.properties.periods);
        setDataHasLoaded(true);
      });
  };
  useEffect(() => {
    getForecastData();
  }, []);

  // +1 h = index 0
  const [hourToDisplay, setHourToDisplay] = useState(0);
  const [forecastByHour, setForcastsByHour] = useState<Forecast[]>([]);

  const incrementHour = () => {
    setHourToDisplay(hourToDisplay + 1);
  };
  const decrementHour = () => {
    setHourToDisplay(hourToDisplay - 1);
  };

  const getTemperatureTrendData = () => {
    // Probably best to not tie data structure to the chart needs, but it's okay for now :)
    return forecastByHour.slice(0, 25).map((forecast, index, self) => {
      return {
        name: `${forecast.number}h`,
        temp: forecast.temperature,
        delta:
          index === 0 ? 0 : forecast.temperature - self[index - 1].temperature,
      } as TempTrend;
    });
  };

  const resetViewToCurrentHour = () => {
    setHourToDisplay(0);
  };

  return (
    <CssVarsProvider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
          height: "100vh",
        }}
      >
        {dataHasLoaded ? (
          <div className={"container"}>
            <div className="back-button">
              <IconButton
                onClick={decrementHour}
                variant={"solid"}
                disabled={hourToDisplay === 0}
              >
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div>
              <ForecastMainTile
                forecast={forecastByHour[hourToDisplay]}
                onReset={resetViewToCurrentHour}
                oneDayTempTrendData={getTemperatureTrendData()}
              />

              <ForecastTrendsSection
                forecastByHour={forecastByHour}
                temperatureTrendData={getTemperatureTrendData()}
              />
            </div>

            <div className="forward-button">
              <IconButton
                onClick={incrementHour}
                variant={"solid"}
                disabled={hourToDisplay > 23}
              >
                <ArrowForwardIcon />
              </IconButton>
            </div>
          </div>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </CssVarsProvider>
  );
}
