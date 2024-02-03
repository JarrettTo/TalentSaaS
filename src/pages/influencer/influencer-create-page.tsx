import { InfluencerForm } from "@widgets/influencer";

export const InfluencerCreatePage = () => {
  return (
    <div className="flex justify-center">
      <InfluencerForm isEditing={false} />
    </div>
  );
};
