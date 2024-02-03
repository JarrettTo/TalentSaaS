import { NumberInput } from "@mantine/core";
import { IMAGES_URL } from "@shared/constants/variables";
import usePlacementsStore from "@shared/lib/stores/rates-store.hook";
import { roundNumberTo2, useEstimatorRates } from "@shared/lib/utils";
import { IOldPlacement } from "@widgets/influencer";
import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import verifiedImage from "@shared/icons/verify-icon.svg";

const cellClasses = "px-3 py-3";

type EstimatorRatesRow = {
  placement: IOldPlacement;
  disabled: boolean;
};

export const EstimatorRatesRow = (props: EstimatorRatesRow) => {
  const { placement, disabled } = props;
  const {
    identifyPlatformType,
    identifyPlatformStatus,
    updateDeliverablesById,
    updateTalentFeeById,
  } = useEstimatorRates();
  const [talentFee, setTalentFee] = useState<number | "">(placement.talantFee);
  const { zustandPlacements, setZustandPlacements } = usePlacementsStore();

  const updateZustandValue = (value: number, isTalentValue: boolean) => {
    if (zustandPlacements) {
      const copiedArray = [...zustandPlacements];
      if (isTalentValue) {
        setTalentFee(value);
        const updatedArray = updateTalentFeeById(
          copiedArray,
          placement.id,
          Number(value)
        );
        setZustandPlacements(updatedArray);
      } else {
        const updatedArray = updateDeliverablesById(
          copiedArray,
          placement.id,
          Number(value)
        );
        setZustandPlacements(updatedArray);
      }
    }
  };

  return (
    zustandPlacements && (
      <div className="flex px-3 items-center">
        <div className={clsx(cellClasses, "w-44 flex items-center")}>
          <div className="relative w-1/5 h-0 pt-[20%] min-w-[20%] bg-slate-300 rounded-full mr-4 overflow-hidden">
            {placement.influencer.avatar != null && (
              <img
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={`${IMAGES_URL}/avatars/${placement.influencer.avatar}`}
                alt=""
              />
            )}
          </div>
          <Link
            to={`/app/influencer/insights/${placement.influencer.id}/youtube`}
            className="text-black h-fit no-underline hover:text-orange"
          >
            {`${placement.influencer.firstname} ${placement.influencer.lastname}`}
          </Link>
        </div>
        <div className={clsx(cellClasses, "w-44 flex items-center pl-10")}>
          <span>{identifyPlatformType(placement.type)}</span>
          {identifyPlatformStatus(placement.type, placement.influencer) === true && (
            <img className="w-4 h-4 ml-2" src={verifiedImage} alt="" />
          )}
        </div>
        <div className={clsx(cellClasses, "w-44")}>
          <NumberInput
            value={talentFee}
            onChange={(value) => {
              updateZustandValue(Number(value), true);
            }}
            defaultValue={placement.talantFee}
            disabled={!disabled}
            min={0}
          />
        </div>
        <div className={clsx(cellClasses, "w-44 overflow-hidden text-ellipsis")}>
          {talentFee != "" ? roundNumberTo2(talentFee * 0.11) : 0}$
        </div>
        <div className={clsx(cellClasses, "w-44 overflow-hidden text-ellipsis")}>
          {talentFee != "" ? roundNumberTo2(talentFee * 0.2) : 0}$
        </div>
        <div className={clsx(cellClasses, "w-44 overflow-hidden text-ellipsis")}>
          test
        </div>
        <div className={clsx(cellClasses, "w-44 overflow-hidden text-ellipsis")}>
          test
        </div>
        <div className={clsx(cellClasses, "w-44 overflow-hidden text-ellipsis")}>
          test
        </div>
        <div className={clsx(cellClasses, "w-44 overflow-hidden text-ellipsis")}>
          test
        </div>
        <div className={clsx(cellClasses, "w-44 overflow-hidden text-ellipsis")}>
          test
        </div>
        <div className={clsx(cellClasses, "w-44 overflow-hidden text-ellipsis")}>
          test
        </div>
        <div className={clsx(cellClasses, "w-44")}>
          <NumberInput
            value={talentFee}
            onChange={(value) => {
              updateZustandValue(Number(value), true);
            }}
            defaultValue={placement.talantFee}
            disabled={!disabled}
            min={0}
          />
        </div>
      </div>
    )
  );
};
