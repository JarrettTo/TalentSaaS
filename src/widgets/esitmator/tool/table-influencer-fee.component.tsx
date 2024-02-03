import { NumberInput } from "@mantine/core";
import { roundNumberTo2 } from "@shared/lib/utils";
import { useEffect, useState } from "react";

const cellClasses =
  "flex items-center justify-center w-1/5 p-4 border-solid border-0 border-l border-orange first:border-l-0";

interface IEstimatorToolData {
  TTL: number;
  TF: number;
  S: number;
  AF: number;
  TFP: number;
  SP: number;
  AFP: number;
}

const EstimatorToolDefaultData: IEstimatorToolData = {
  TTL: 0,
  TF: 0,
  S: 0,
  AF: 0,
  TFP: 0,
  SP: 0,
  AFP: 0,
};

export const TableInfluencerFee = () => {
  const [data, setData] = useState<IEstimatorToolData>(
    EstimatorToolDefaultData
  );

  const updateTFInput = (value: number) => {
    const copiedData = { ...data };
    copiedData.TF = value;
    setData(copiedData);
  };

  const updateAFPInput = (value: number) => {
    const copiedData = { ...data };
    copiedData.AFP = value;
    setData(copiedData);
  };

  useEffect(() => {
    const copiedData = { ...data };
    copiedData.S = roundNumberTo2(copiedData.TF *  0.11)
    copiedData.AF = roundNumberTo2((copiedData.TF + copiedData.S) * (copiedData.AFP / 100))
    copiedData.TTL = roundNumberTo2(copiedData.TF + copiedData.S + copiedData.AF)
    copiedData.TFP = copiedData.TTL != 0 ? roundNumberTo2((copiedData.TF / copiedData.TTL) * 100) : 0
    copiedData.SP= copiedData.TTL != 0 ? roundNumberTo2((copiedData.S / copiedData.TTL) * 100) : 0
    setData(copiedData);
  }, [data.TF, data.AFP]);

  return (
    <div className="mt-20">
      <div className="text-xl min-h-[2.625rem]">Organise by Talent Fee</div>
      <div className="bg-white mt-10 rounded-2xl shadow-2xl overflow-hidden ">
        <div className="flex border-orange border-solid border-0 border-b">
          <div className={cellClasses}></div>
          <div className={cellClasses}>Total Fee</div>
          <div className={cellClasses}>Talent Fee</div>
          <div className={cellClasses}>Superannation</div>
          <div className={cellClasses}>Agency Fee</div>
        </div>
        <div className="flex border-0 border-solid border-b border-orange">
          <div className={cellClasses}>Commision, $</div>
          <div className={cellClasses}>{data.TTL} $</div>
          <div className={cellClasses}>
            <NumberInput
              value={data.TF}
              onChange={(value) => updateTFInput(Number(value))}
              min={0}
              placeholder="Type your amount"
            />
          </div>
          <div className={cellClasses}>{data.S} $</div>
          <div className={cellClasses}>{data.AF} $</div>
        </div>
        <div className="flex">
          <div className={cellClasses}>Breakdown, %</div>
          <div className={cellClasses}></div>
          <div className={cellClasses}>{data.TFP} %</div>
          <div className={cellClasses}>{data.SP} %</div>
          <div className={cellClasses}>
            <NumberInput
              value={data.AFP}
              onChange={(value) => updateAFPInput(Number(value))}
              min={0}
              placeholder="Type your amount"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
