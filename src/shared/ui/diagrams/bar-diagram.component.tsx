import {
  Chart as ChartJS,
  Tooltip,
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  ChartItem,
} from "chart.js";
import { useEffect, useRef } from "react";

ChartJS.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController
);

interface IDataset {
  label: string;
  data: number[];
  backgroundColor: string | string[]
}

type BarVerticalProps = {
  data: {
    labels: string[];
    datasets: IDataset[];
  };
};
function sortDataByAge(data: {
  labels: string[];
  datasets: IDataset[];
}) {

  const formatAgeLabel = (label: string) => {

    let formattedLabel = label.replace('age', '').trim();

    if (formattedLabel.endsWith('-')) {
      formattedLabel = formattedLabel.replace('-', '+');
    }

    return formattedLabel;
  };
  const extractAge = (ageRange: string) => {
    const match = ageRange.match(/\d+/); 
    return match ? parseInt(match[0], 10) : 0;
  };
  if (data.datasets.length > 0 && data.datasets[0] && data.datasets[0].data) {

    const indices = data.labels.map((_, index) => index);

    indices.sort((a, b) => {
      const labelA = data.labels[a];
      const labelB = data.labels[b];

      if (labelA !== undefined && labelB !== undefined) {
        const ageA = extractAge(labelA);
        const ageB = extractAge(labelB);
        return ageA - ageB;
      }

      return 0; 
    });
    const sortedData = indices.map(index => data.datasets[0]?.data[index]);
    const sortedLabels = indices.map(index => formatAgeLabel(data.labels[index]!!));

    if(typeof sortedData != undefined){
      data.datasets[0].data = sortedData? sortedData : Array();
    }
    
    data.labels = sortedLabels? sortedLabels : Array();
  }
}
export const BarDiagram = (props: BarVerticalProps) => {
  const { data } = props;
  const diagramRef = useRef(null);
  let verticalChart: ChartJS<"bar", number[], string>

  const initChart = (currentCanvas: ChartItem) => {
    sortDataByAge(data);
    verticalChart = new Chart(currentCanvas, {
      type: "bar",
      data: data,
    });
  }

  useEffect(() => {
    const currentCanvas = diagramRef.current;
    if (currentCanvas != null) {
      initChart(currentCanvas)
    }

    return () => {
      verticalChart.destroy();
    };
  }, [props]);

  return <canvas ref={diagramRef}></canvas>;
};
