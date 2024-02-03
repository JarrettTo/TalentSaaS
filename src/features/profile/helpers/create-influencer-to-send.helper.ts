import {
  checkBirthdayDate,
  checkHand,
  checkYesOrNo,
  updateProfileSchema,
} from "@shared/lib/utils";
import { IInfluencer } from "@widgets/influencer";
import { TypeOf } from "zod";

type FormData = TypeOf<typeof updateProfileSchema>;

interface IInfluencerToSend extends Partial<IInfluencer> {
  groupName?: string;
}

export const createInfluencerToSend = (formData: FormData): IInfluencerToSend => {
  const dataToSend: IInfluencerToSend = {
    firstname: formData.firstname,
    lastname: formData.lastname,
    groupName: formData.groupName ? formData?.groupName[0] : undefined,
    email: formData.email,
    phone: formData.phone,
    mediaKitLink: formData.mediaKitLink,
    tiktokProfile: formData.tiktokProfile,
    instagramProfile: formData.instagramProfile,
    youtubeProfile: formData.youtubeProfile ? formData.youtubeProfile : undefined,
    streetAddress: formData.streetAddress,
    contractStartDate: formData.contractStartDate,
    contractEndDate: formData.contractEndDate,
    state: formData.state,
    TFN: formData.TFN.replace(/\s/g, ""),
    bankAccountName: formData.bankAccountName,
    bankBSB: formData.bankBSB,
    bankAccountNumber: formData.bankAccountNumber,
    superFundName: formData.superFundName,
    superFundBillerCode: formData.superFundBillerCode,
    superFundReferenceNumber: formData.superFundReferenceNumber,
    birthday: checkBirthdayDate(formData.birthday),
    age: Number(formData?.age),
    giftIdeas: formData.giftIdeas,
    alcohol: formData.alcohol,
    shoeSize: formData.shoeSize,
    dreamHolidayDestination: formData.dreamHolidayDestination,
    dreamBrandCollaboration: formData.dreamBrandCollaboration,
    dreamCar: formData.dreamCar,
    milkOfChoice: formData.milkOfChoice,
    yourPhone: formData.yourPhone,
    yourPhoneProvider: formData.yourPhoneProvider,
    investmentService: formData.investmentService,
    supermarket: formData.supermarket,
    chemistOfChoice: formData.chemistOfChoice,
    bottleshopOfChoice: formData.bottleshopOfChoice,
    internetProvider: formData.internetProvider,
    charityOfChoice: formData.charityOfChoice,
    streaming: formData.streaming,
    musicStreamingOfChoice: formData.musicStreamingOfChoice,
    notes: formData.notes,
    isHelp: checkYesOrNo(formData.isHelp),
    ABN: formData.ABN.replace(/\s/g, ""),
    havePartner: formData.havePartner,
    leftOrRightHand: checkHand(formData.leftOrRightHand),
  };

  return dataToSend;
};
