import { useRecoilValue } from "recoil";
import Graph, { graphData } from "../Misc/Graph";

export default function Tracking() {
  console.warn("Ignore the error of \"Check the render method of `Tracking`\", see https://stackoverflow.com/questions/65506656/recoil-duplicate-atom-key-in-nextjs for more information.")
  const getGraphData = useRecoilValue(graphData);
  return (
    <div className="tracking_component">
      <h1>BMI Tracking</h1>
      <div className="tracking_content">
        <div className="tracking_history">
          <h1>BMI History</h1>
          <div className="history">
            {getGraphData.map((val) => {
              return (
                <div>
                  <p>{val.date}</p>
                  <p>-</p>
                  <p>{val.index}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="tracking_graph">
          <Graph />
        </div>
      </div>
    </div>
  );
}
