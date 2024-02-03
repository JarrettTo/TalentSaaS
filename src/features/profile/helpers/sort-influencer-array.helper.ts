import { IInfluencer } from "@widgets/influencer";

export const sortInfluencerByGroup = (influencers: IInfluencer[]): IInfluencer[] => {
  let objectsWithGroupNull = influencers.filter((obj) => obj.group === null);
  let objectsWithoutGroupNull = influencers.filter((obj) => obj.group !== null);
  let resultArray = objectsWithoutGroupNull.concat(objectsWithGroupNull);

  return resultArray;
};
