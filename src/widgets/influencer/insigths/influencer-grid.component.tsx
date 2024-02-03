import { BarDiagram, DoughnutDiagram, BarPercentage } from "@shared/ui";
import { IInfluencer } from "../types";

type InfluencerInsightsGridProps = {
  influencer: IInfluencer;
};

const cellClasses = 'flex flex-col justify-between bg-white p-4 rounded-xl w-3/12 shadow-2xl'

const ageData = {
  labels: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
  datasets: [
    {
      label: "Male",
      data: [10, 20, 30, 40, 40, 60],
      backgroundColor: "#c4d1ff",
    },
    {
      label: "Female",
      data: [50, 15, 40, 26, 58, 10],
      backgroundColor: "#7690ed",
    },
  ],
};

const diagramData = {
  labels: ["Red", "Blue", "Yellow", "Green"],
  datasets: [
    {
      label: " ",
      data: [20, 25, 35, 25],
      backgroundColor: ["#f89e72", "#f77333", "#c4d1ff", "#7690ed"],
    },
  ],
};

export const InfluencerInsightsGrid = (props: InfluencerInsightsGridProps) => {
  const { influencer } = props;

  return (
    <div className="w-9/12 pl-8">
      <div className="flex space-x-3">
        <div className={cellClasses}>
          <div className="text-lg">Followers</div>
          <div className="text-5xl mt-3">1.5M</div>
        </div>
        <div className={cellClasses}>
          <div className="text-lg">Average Views</div>
          <div className="text-5xl mt-3">290k</div>
        </div>
        <div className={cellClasses}>
          <div className="text-lg">Eng. Rate</div>
          <div className="text-5xl mt-3">290k</div>
        </div>
        <div className={cellClasses}>
          <div className="text-lg">Completion Rate</div>
          <div className="text-5xl mt-3">27%</div>
        </div>
      </div>
      <div className="flex mt-3 space-x-3">
        <div className="w-5/12 p-4 bg-white rounded-xl shadow-2xl">
          <div className="text-xl">Gender</div>
          <div className="w-56 h-56 mt-2">
            <DoughnutDiagram data={diagramData} />
          </div>
        </div>
        <div className="w-7/12 p-4 bg-white rounded-xl flex flex-col justify-between shadow-2xl">
          <div className="text-xl">Age</div>
          <BarDiagram data={ageData} />
        </div>
      </div>
      <div className="flex mt-3 space-x-3">
        <div className="w-7/12 p-4 bg-white rounded-xl shadow-2xl">
          <div className="text-xl">Country</div>
          <div className="w-56 h-56 mt-2">
            <DoughnutDiagram data={diagramData} />
          </div>
        </div>
        <div className="w-5/12 p-4 bg-white rounded-xl shadow-2xl">
          <div className="text-xl">Device</div>
          <div className="w-56 h-56 mt-2">
            <DoughnutDiagram data={diagramData} />
          </div>
        </div>
      </div>
    </div>
  );
};
