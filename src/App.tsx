import React, { useEffect, useState } from "react";
import "./App.css";
import { CssVarsProvider } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import axios from "axios";
import ForecastMainTile from "./ForecastMainTile";
import { CircularProgress, IconButton, Link } from "@mui/joy";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Forecast, TempTrend } from "./types/Types";
import ForecastTrendsSection from "./ForecastTrendsSection";
import { format } from "date-fns";

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
        name: `${format(new Date(forecast.startTime), "h a")}`,
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
      <Box className={"root"}>
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
