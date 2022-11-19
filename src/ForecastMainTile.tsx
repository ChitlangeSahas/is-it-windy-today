import {Forecast} from "./App";
import React, {useState} from "react";
import {Card, Divider, Link} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import CompassDirection, {Direction} from "./CompassDirection";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

type ForecastMainTileProps = {
    forecast: Forecast
    oneDayTempTrendData: any
    oneDayWindTrendData: any
}

const ForecastMainTile = (props: ForecastMainTileProps) => {
    const {forecast, oneDayWindTrendData, oneDayTempTrendData} = props
    const [displayTwentyFourHourWind, setDisplayTwentyFourHourWind] = useState(false)


    const temperatures = oneDayTempTrendData.map((trend: any) => trend.temp)

    const deltaTemperatures = temperatures.map((temp: number, index: number, self: []) => {
        if (index === 0) {
            return 0
        }

        return temp - self[index - 1]
    })

    console.log(deltaTemperatures)
    return <>
        <Card variant={"outlined"}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <Typography fontSize={"lg"} fontWeight={"bold"}>
                        {new Date(forecast.startTime).toLocaleString()}
                    </Typography>
                    <Typography fontSize="medium">
                        {forecast.shortForecast}
                    </Typography>
                </div>
                <div>
                    <Typography level="h2">
                        <span>{forecast.temperature}{'° '}{forecast.temperatureUnit}{' '}</span>
                        {deltaTemperatures[forecast.number - 1] !== 0 &&
                            <div style={{display: 'inline-flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Typography fontSize={"medium"}
                                            color={"info"}><span>{deltaTemperatures[forecast.number - 1]}</span></Typography>
                            </div>}
                    </Typography>

                </div>

            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                textAlign: 'center',
                marginTop: '20px'
            }}>
                <div>
                    <CompassDirection direction={forecast.windDirection as Direction}/>
                    <Typography level="h2">
                        {forecast.windDirection}
                    </Typography>
                </div>
                <Typography level="h4">
                    {forecast.windSpeed}
                </Typography>
            </div>

            <Divider sx={{mt: 10}}/>
            {displayTwentyFourHourWind ?
                <Typography sx={{mt: 3}} fontSize={"lg"}>Wind trend (24h)</Typography> :
                <Typography sx={{mt: 3}} fontSize={"lg"}>Wind trend (12h)</Typography>
            }


            <div>
                {oneDayWindTrendData.slice(0, 11).map((trend: any) => {
                    return <div style={{display: 'inline-flex', flexDirection: 'column', alignItems: 'center'}}>
                        <CompassDirection direction={trend.windDirection}/>
                        <Typography color={"info"}>{trend.windSpeed}</Typography>
                    </div>
                })
                }

            </div>
            {!displayTwentyFourHourWind &&
                <Link onClick={() => setDisplayTwentyFourHourWind(true)} sx={{alignSelf: 'flex-end', mt: 2, mr: 1}}>View
                    more</Link>}
            {displayTwentyFourHourWind &&
                <div>
                    {oneDayWindTrendData.slice(0, 11).map((trend: any) => {
                        return <div style={{display: 'inline-flex', flexDirection: 'column', alignItems: 'center'}}>
                            <CompassDirection direction={trend.windDirection}/>
                            <Typography color={"info"}>{trend.windSpeed}</Typography>
                        </div>
                    })
                    }
                </div>
            }

            <Typography sx={{mt: 3}} fontSize={"lg"}>Temperature trend (24h)</Typography>

            <LineChart
                width={780}
                height={200}
                data={props.oneDayTempTrendData}
                margin={{
                    top: 30,
                    right: 30,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="temp" stroke="green"/>
            </LineChart>


        </Card>
    </>
}


export default ForecastMainTile
