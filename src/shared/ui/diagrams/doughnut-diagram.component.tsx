import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  DoughnutController,
  Chart,
  ChartItem,
} from "chart.js";
import { useRef, useEffect } from "react";
ChartJS.register(ArcElement, Tooltip, DoughnutController);

interface IDataset {
  label: string;
  data: number[];
  backgroundColor: string[];
}

type BarDiagramProps = {
  data: {
    labels: string[];
    datasets: IDataset[];
  };
};


export const DoughnutDiagram = (props: BarDiagramProps) => {
  const { data } = props;
  
  const diagramRef = useRef(null);
  let verticalChart: any;

  const initChart = (currentCanvas: ChartItem) => {
    verticalChart = new Chart(currentCanvas, {
      type: "doughnut",
      data: data,
      options: {
        elements: {
          arc: {
            borderWidth: 0,
          },
        },
      },
    });
  }

  useEffect(() => {
    const currentCanvas = diagramRef.current;
    if (currentCanvas != null) {
      initChart(currentCanvas)
    }

    return () => {
      // console.log('destroy')
      verticalChart.destroy();
    };
  }, [props]);

  return <canvas ref={diagramRef}></canvas>;
};
