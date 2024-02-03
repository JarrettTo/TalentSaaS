import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartItem,
  Chart,
} from 'chart.js';
import { useEffect, useRef } from 'react';

ChartJS.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);
interface IDataset {
  label: string;
  data: number[];
  backgroundColor: string | string[]
}

type BarPercentageProps = {
  data: {
    labels: string[];
    datasets: IDataset[];
  };
};

export const BarPercentage = (props: BarPercentageProps) => {
  const { data } = props;
  const totalNumber = data.datasets[0]?.data.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
  }, 0);
  const CountryPercentage = (props: { label: string | undefined, count: number | undefined})=>{
    return props.count ? (
      <div className='mb-2'>
        <div className='flex flex-row justify-between mb-1.5'>
          <div className='flex flex-row justify-start items-center'>
            <div className='flex items-center ml-1 mr-3'>
              <img src={`https://flagsapi.com/${props.label}/flat/64.png`} className='w-5 h-auto'/>
            </div>
            <div>
              {props.label}
            </div>
          </div>
          <div>{ calcPercentage(props.count) + "%"}</div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-blue h-3 rounded-full"
            style={{ width: `${calcPercentage(props.count)}%` }}
          ></div>
        </div>
      </div>
    ) : null
  }
  const calcPercentage = (count: number ) =>{
    const result= count/totalNumber!!;
    return Math.round(result * 100) ;
  }
  useEffect(() => {
    

  }, [data]); // Ensure this effect runs only when the data changes

  return(
    <div className='flex flex-col justify-start mt-6'>
      <div className='mb-3'>
        Location By Country
      </div>
      <CountryPercentage label={data.labels[0]} count={data.datasets[0]?.data[0]}/>
      <CountryPercentage label={data.labels[1]} count={data.datasets[0]?.data[1]}/>
      <CountryPercentage label={data.labels[2]} count={data.datasets[0]?.data[2]}/>
      <CountryPercentage label={data.labels[3]} count={data.datasets[0]?.data[3]}/>
      <CountryPercentage label={data.labels[4]} count={data.datasets[0]?.data[4]}/>
    </div>
  )
};