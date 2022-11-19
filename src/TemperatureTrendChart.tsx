import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import React from "react";
import { TempTrend } from "./types/Types";

type TemperatureTrendsChartProps = {
  temperatureTrendData: TempTrend[]
}

class TemperatureTrendChart extends React.Component<TemperatureTrendsChartProps> {

  constructor(props: TemperatureTrendsChartProps) {
    super(props);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {temperatureTrendData} = this.props

    console.log("rendering temp data")
    return <LineChart
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
  }


}

export default TemperatureTrendChart;

