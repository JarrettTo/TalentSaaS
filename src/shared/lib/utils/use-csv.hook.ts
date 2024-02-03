import { IInfluencer } from "@widgets/influencer";

export const useCSV = () => {
  const isCheckedRowsInArray = (array: IInfluencer[]) => {
    let isCheckedRows = false;
    array.forEach((influencer) => {
      if (influencer.checked === true) {
        isCheckedRows = true;
      }
    });

    return isCheckedRows;
  };

  const generateIDsStringForCSV = (array: IInfluencer[]) => {
    let IDsArray = [];
    IDsArray = array.filter((influencer) => influencer.checked === true);
    IDsArray = IDsArray.map((influencer) => `ids=${influencer.id}`);

    return IDsArray.join("&");
  };

  return { isCheckedRowsInArray, generateIDsStringForCSV };
};
