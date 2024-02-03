import { NumberInput, Tooltip } from "@mantine/core";
import { IMAGES_URL } from "@shared/constants/variables";
import { roundNumberTo2 } from "@shared/lib/utils";
import clsx from "clsx";
import { Link } from "react-router-dom";
import verifiedImage from "@shared/icons/verify-icon.svg";
import { IPlacementLastLog, IRatesPlacement } from "@entities/placement/lib/interfaces";
import { PlacementDictionary, checkIfPlatformConnected } from "@entities/placement";

const cellClasses = "px-3 py-3";

type RatesRow = {
  ratesPlacement: IRatesPlacement;
  placementsLastLogs?: IPlacementLastLog[];
  disabled: boolean;
  onTalentFeeUpdate: (quotePlacementId: number, talentFee: number) => void;
  onBoostingUpdate: (quotePlacementId: number, boosting: number) => void;
};

export const RatesFrozenRowsKeys = (props: RatesRow) => {
  const {
    ratesPlacement,
    placementsLastLogs,
    disabled,
    onTalentFeeUpdate,
    onBoostingUpdate,
  } = props;

 

  return (
    <div className="flex px-3 items-center mt-3" > {/* This div should be the flex container */}
      <div className={clsx(cellClasses, "w-44 flex items-center")} style={{height:44}}>
            <div className="relative w-1/5 h-0 pt-[20%] min-w-[20%] bg-slate-300 rounded-full mr-4 overflow-hidden">
              {ratesPlacement.influencer.avatar != null && (
                <img
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  src={`${IMAGES_URL}/avatars/${ratesPlacement.influencer.avatar}`}
                  alt=""
                />
              )}
            </div>
            <Link
              to={`/app/influencer/insights/${ratesPlacement.influencer.id}/youtube`}
              className="text-black h-fit truncate no-underline hover:text-orange"
            >
              {`${ratesPlacement.influencer.firstname} ${ratesPlacement.influencer.lastname}`}
            </Link>
          </div>
          <div className={clsx(cellClasses, "w-44 flex items-center pl-10")}>
            <p>{PlacementDictionary[ratesPlacement.type]}</p>
            {checkIfPlatformConnected(ratesPlacement.type, ratesPlacement.influencer) && (
              <img className="w-4 h-4 ml-2" src={verifiedImage} alt="" />
            )}
          </div>
    </div>
  );
};
