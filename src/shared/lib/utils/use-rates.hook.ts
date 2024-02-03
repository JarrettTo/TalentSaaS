import { ICampaignItem, IInfluencer, IOldPlacement } from "@widgets/influencer";

export const useEstimatorRates = () => {
  const identifyPlatformType = (type: number) => {
    switch (type) {
      case 0:
        return "YouTube";
      case 1:
        return "TikTok";
      case 2:
        return "Instagram";
    }

    return "Unknown";
  };

  const identifyPlatformStatus = (type: number, influencer: IInfluencer) => {
    const isYoutubeConnected = influencer.isYoutubeConnected;
    const isInstagramConnected = influencer.isInstagramConnected;

    switch (true) {
      case isYoutubeConnected && type === 0:
      case isInstagramConnected && type === 2:
        return true;
      default:
        return false;
    }
  };

  const addNecessaryFields = (array: IOldPlacement[]) => {
    array.forEach((item) => {
      //item.id = Number(`${item.influencer.id}${item.type}`)
      item.influencerID = item.influencer.id;
      item.talantFee === null
        ? (item.talantFee = 0)
        : (item.talantFee = Number(item.talantFee));
      item.agencyFee = 0;
      item.deliverables = 0;
    });

    return array;
  };

  const updateDeliverablesById = (
    array: IOldPlacement[],
    id: number,
    deliverables: number
  ) => {
    const necessaryIndex = array.findIndex((element) => element.id === id);
    if (necessaryIndex !== -1) {
      (array[necessaryIndex] as IOldPlacement).deliverables = deliverables;
    }
    return array;
  };

  const updateTalentFeeById = (array: IOldPlacement[], id: number, talantFee: number) => {
    const necessaryIndex = array.findIndex((element) => element.id === id);
    if (necessaryIndex !== -1) {
      (array[necessaryIndex] as IOldPlacement).talantFee = talantFee;
    }

    return array;
  };

  const makeCampaingArray = (array: IOldPlacement[]) => {
    let newArray: ICampaignItem[] = [];

    array.forEach((item) => {
      const existedElement = newArray.find(
        (element) => element.influencerID == item.influencerID
      );
      if (item.deliverables !== 0 && item.talantFee !== 0) {
        if (existedElement == undefined) {
          let newObject: ICampaignItem = {
            influencerID: item.influencerID,
            name: `${item.influencer.firstname} ${item.influencer.lastname}`,
            totalFee: item.talantFee * item.deliverables,
            platform: identifyPlatformType(item.type),
          };

          newArray.push(newObject);
        } else {
          existedElement.totalFee =
            existedElement.totalFee + item.talantFee * item.deliverables;
          existedElement.platform = `${existedElement.platform}, ${identifyPlatformType(
            item.type
          )}`;
        }
      }
    });

    // console.log('newArray inside makeCampaingArray', newArray)

    return newArray;
  };

  return {
    identifyPlatformType,
    identifyPlatformStatus,
    addNecessaryFields,
    updateDeliverablesById,
    updateTalentFeeById,
    makeCampaingArray,
  };
};
