import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { atom, useRecoilValue } from "recoil";

export const graphData = atom({
  key: "graphData",
  default: [
    {date: "August 2020", index: 18.5},
    {date: "September 2020", index: 20},
    {date: "October 2020", index: 23},
    {date: "November 2020", index: 22},
    {date: "December 2020", index: 20},
    {date: "January 2021", index: 21}
  ],
});

export default function Graph() {
  const getGraphData = useRecoilValue(graphData);
  return (
    <Line
      data={{
        labels: getGraphData.map((val) => { return val.date }),
        datasets: [
          {
            label: "BMI Index",
            data: getGraphData.map((val) => { return val.index }),
            borderColor: "black",
            fill: false,
          },
        ],
      }}
      options={{
        scales: {
          y: {
            suggestedMin: 0,
            suggestedMax: 40,
          },
        },
      }}
    />
  );
}
