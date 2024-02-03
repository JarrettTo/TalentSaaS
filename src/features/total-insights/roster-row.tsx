import { IMAGES_URL } from "@shared/constants/variables";
import { IInfluencer } from "@widgets/influencer";
import clsx from "clsx";
import { Link } from "react-router-dom";

type ITotalInsightRosterRow = {
  influencer: IInfluencer;
};

export const TotalInsightRosterRow = (props: ITotalInsightRosterRow) => {
  const { influencer } = props;

  return (
    <div className={clsx("flex items-center mt-4")}>
      <div className="relative w-1/12 h-0 pt-[8.33%] min-w-[8.33%] bg-slate-300 rounded-full mr-4 overflow-hidden">
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
        className="text-black h-fit no-underline hover:text-orange"
      >{`${influencer.firstname} ${influencer.lastname}`}</Link>
    </div>
  );
};
