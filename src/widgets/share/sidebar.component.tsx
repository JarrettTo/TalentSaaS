import { IMAGES_URL } from "@shared/constants/variables";
import { IInfluencer } from "@widgets/influencer";

type InfluencerInsightsSidebarProps = {
  influencer: IInfluencer;
};

export const ShareInfluencerSidebar = (props: InfluencerInsightsSidebarProps) => {
  const { influencer } = props;

  return (
    <div className="bg-white w-3/12 rounded-2xl py-8 px-7 shadow-2xl h-fit">
      <div className="relative w-8/12 h-0 pt-[66.6%] mx-auto rounded-full bg-slate-200 text-gray text-center mb-4 overflow-hidden">
        {influencer.avatar != null && (
          <img
            className="absolute left-0 top-0 w-full h-full object-cover"
            src={`${IMAGES_URL}/avatars/${influencer.avatar}`}
            alt=""
          />
        )}
      </div>
      <div className="text-3xl text-center">{`${influencer.firstname} ${influencer.lastname}`}</div>
    </div>
  );
};
