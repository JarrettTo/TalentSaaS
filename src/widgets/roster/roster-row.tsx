import { Checkbox } from "@mantine/core";
import { UseListStateHandlers } from "@mantine/hooks";
import { IMAGES_URL } from "@shared/constants/variables";
import { IInfluencer } from "@widgets/influencer";
import clsx from "clsx";
import { Link } from "react-router-dom";
import verifiedImage from "@shared/icons/verify-icon.svg";
import { format } from "date-fns";

const cellClasses = "px-3 py-4 w-4/12 text-ellipsis overflow-hidden";

export interface IRosterCheckedRows {
  id: number;
  checked: boolean;
}

type RosterRowProps = {
  index: number;
  influencer: IInfluencer;
  checkedInfo: {
    checkedRows: IInfluencer[];
    setCheckedRows: UseListStateHandlers<IInfluencer>;
  };
  uniqueGroupIDs: number[];
};

export const RosterRow: React.FC<RosterRowProps> = (props) => {
  const { index, influencer, checkedInfo, uniqueGroupIDs } = props;

  return (
    <div>
      {uniqueGroupIDs.includes(influencer.id) && (
        <div className="px-4 test w-full pt-2 border-slate-200 border-0 border-t-2 border-solid">
          {influencer.group ? influencer.group.name : "Talents without group"}
        </div>
      )}
      <div className="flex items-center px-4 overflow-hidden w-full">
        <div>
          <Checkbox
            size="md"
            color="dark"
            checked={checkedInfo.checkedRows[index]?.checked}
            onChange={(event) =>
              checkedInfo.setCheckedRows.setItemProp(
                index,
                "checked",
                event.currentTarget.checked
              )
            }
          />
        </div>
        <div className="flex items-center w-[calc(100%_-_2rem)]">
          <div className={clsx(cellClasses, "flex items-center")}>
            <div className="relative w-3/12 h-0 pt-[25%] min-w-[25%] bg-slate-300 rounded-full mr-4 overflow-hidden">
              {influencer.avatar != null && (
                <img
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  src={`${IMAGES_URL}/avatars/${influencer.avatar}`}
                  alt=""
                />
              )}
            </div>
            <Link
              to={`/app/influencer/insights/${influencer.id}/youtube`}
              className="text-black h-fit truncate no-underline w-9/12 hover:text-orange"
            >{`${influencer.firstname} ${influencer.lastname}`}</Link>
          </div>
          <div className={clsx(cellClasses)}>{influencer.email}</div>
          <div className={clsx(cellClasses, "flex items-center")}>
            <span
              className={clsx(
                "truncate",
                influencer.isYoutubeConnected && "max-w-[87%] pr-2"
              )}
            >
              {influencer.youtubeProfile}
            </span>
            {influencer.isYoutubeConnected === true && (
              <img className={clsx("w-4 h-4")} src={verifiedImage} alt="" />
            )}
          </div>
          <div className={clsx(cellClasses, "flex items-center")}>
            <span
              className={clsx(
                "truncate",
                influencer.isTikTokConnected && "max-w-[87%] pr-2"
              )}
            >
              {influencer.tiktokProfile}
            </span>
            {influencer.isTikTokConnected === true && (
              <img className={clsx("w-4 h-4")} src={verifiedImage} alt="" />
            )}
          </div>
          <div className={clsx(cellClasses, "flex items-center")}>
            <span
              className={clsx(
                " truncate ",
                influencer.isInstagramConnected && "max-w-[87%] pr-2"
              )}
            >
              {influencer.instagramProfile}
            </span>
            {influencer.isInstagramConnected === true && (
              <img className={clsx("w-4 h-4")} src={verifiedImage} alt="" />
            )}
          </div>
          <div className={clsx(cellClasses, "flex items-center")}>
            <span className={" truncate"}>
              {`${format(new Date(influencer.contractStartDate), "dd-MM-yyyy")}`}
            </span>
          </div>
          <div className={clsx(cellClasses, "flex items-center")}>
            <span className={" truncate"}>
              {`${format(new Date(influencer.contractEndDate), "dd-MM-yyyy")}`}
            </span>
          </div>
          <div className={clsx(cellClasses, "w-1/12 pr-0")}>
            <span>{influencer.state}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
