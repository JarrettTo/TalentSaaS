import authApi from "@features/auth/api/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, SelectItem } from "@mantine/core";
import { toast } from "react-toastify";

import { calculateAgeByBirthday, updateProfileSchema } from "@shared/lib/utils";
import {
  FormTextInput,
  FormDateInput,
  FormTextarea,
  FormTextInputMask,
  FormSelect,
} from "@shared/ui/form-elements";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { TypeOf } from "zod";
import { useNavigate } from "react-router-dom";
import { IInfluencer } from "./types";
import { DeleteAccountModal, createInfluencerToSend } from "@features/profile";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { tryChangeArchiving } from "@features/profile/api";
import { getInfluencerGroups } from "@widgets/roster";
import { CustomMultiSelectWithCreation } from "@shared/ui/form-elements/multi-select/ui/multi-select.component";

type InfluencerFormProps = {
  influencer?: IInfluencer;
  isEditing: boolean;
};

export const InfluencerForm: React.FC<InfluencerFormProps> = (props) => {
  const navigate = useNavigate();
  const { influencer, isEditing } = props;
  const [opened, { open, close }] = useDisclosure(false);
  const [isArchived, setIsArchived] = useState<boolean | undefined>(
    influencer?.isArchived
  );
  const [isPayThemselves, setIsPayThemselves] = useState(false);

  const [groups, setGroups] = useState<SelectItem[]>([]);

  type RegisterInput = TypeOf<typeof updateProfileSchema>;

  const methods = useForm<RegisterInput>({
    defaultValues: {
      firstname: influencer?.firstname ?? "",
      lastname: influencer?.lastname ?? "",
      groupName:
        influencer?.group?.name !== undefined ? [influencer?.group?.name] : undefined,
      email: influencer?.email ?? "",
      phone: influencer?.phone ?? "",
      mediaKitLink: influencer?.mediaKitLink ?? "",
      tiktokProfile: influencer?.tiktokProfile ?? "",
      instagramProfile: influencer?.instagramProfile ?? "",
      youtubeProfile: influencer?.youtubeProfile ?? "",
      streetAddress: influencer?.streetAddress ?? "",
      contractStartDate: influencer?.contractStartDate ?? "",
      contractEndDate: influencer?.contractEndDate ?? "",
      state: influencer?.state ?? "",
      TFN: influencer?.TFN ?? "",
      bankAccountName: influencer?.bankAccountName ?? "",
      bankBSB: influencer?.bankBSB ?? "",
      bankAccountNumber: influencer?.bankAccountNumber ?? "",
      superFundName: influencer?.superFundName ?? "",
      superFundBillerCode: influencer?.superFundBillerCode ?? "",
      superFundReferenceNumber: influencer?.superFundReferenceNumber ?? "",
      birthday: influencer?.birthday ?? "",
      age: influencer?.age ?? "",
      giftIdeas: influencer?.giftIdeas ?? "",
      alcohol: influencer?.alcohol ?? "",
      shoeSize: influencer?.shoeSize ?? "",
      dreamHolidayDestination: influencer?.dreamHolidayDestination ?? "",
      dreamBrandCollaboration: influencer?.dreamBrandCollaboration ?? "",
      dreamCar: influencer?.dreamCar ?? "",
      milkOfChoice: influencer?.milkOfChoice ?? "",
      yourPhone: influencer?.yourPhone ?? "",
      yourPhoneProvider: influencer?.yourPhoneProvider ?? "",
      investmentService: influencer?.investmentService ?? "",
      supermarket: influencer?.supermarket ?? "",
      chemistOfChoice: influencer?.chemistOfChoice ?? "",
      bottleshopOfChoice: influencer?.bottleshopOfChoice ?? "",
      internetProvider: influencer?.internetProvider ?? "",
      charityOfChoice: influencer?.charityOfChoice ?? "",
      streaming: influencer?.streaming ?? "",
      musicStreamingOfChoice: influencer?.musicStreamingOfChoice ?? "",
      notes: influencer?.notes ?? "",
      isHelp:
        influencer?.isHelp !== undefined ? (influencer.isHelp === true ? "1" : "0") : "",
      ABN: influencer?.ABN ?? "",
      havePartner: influencer?.havePartner ?? "",
      leftOrRightHand:
        influencer != null ? (influencer.leftOrRightHand == "0" ? "Left" : "Right") : "",
    },
    resolver: zodResolver(updateProfileSchema),
  });

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const birthDateDayValue = watch("birthday");
  const contractStartDateValue = watch("contractStartDate");

  const submitForm: SubmitHandler<RegisterInput> = async (data) => {
    const dataToSend = createInfluencerToSend(data);

    if (isEditing && influencer !== undefined) {
      try {
        await authApi.put(`/influencer/${influencer.id}`, dataToSend);
        toast.success("Talent Profile successfully updated");
      } catch (error: any) {
        if (error.response.data.errorMessage) {
          toast.error(error.response.data.errorMessage.join(", "), {
            autoClose: false,
          });
        } else {
          toast.error("Error on updating Talent profile");
        }
      }
    } else {
      try {
        await authApi.post("/influencer", dataToSend);
        toast.success("Talent Profile successfully created");
        //console.log(response.data);
        navigate(`/app/roster`);
      } catch (error: any) {
        if (error.response.data.errorMessage) {
          toast.error(error.response.data.errorMessage.join(", "), {
            autoClose: false,
          });
        } else {
          toast.error("Error on create Talent profile");
        }
      }
    }
  };

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    submitForm(values);
  };

  const onArchiveHandler = async () => {
    if (influencer) {
      try {
        const response = await tryChangeArchiving(influencer.id);
        toast.success("The status of the influencer has been successfully changed");
        // console.log(response);
        setIsArchived(response);
      } catch {
        toast.error("Error on changing influencer status");
      }
    }
  };

  useEffect(() => {
    if (birthDateDayValue) {
      const age = calculateAgeByBirthday(new Date(birthDateDayValue));
      setValue("age", age);
    } else {
      setValue("age", "");
    }
  }, [birthDateDayValue]);

  const tryGetGroups = async () => {
    try {
      const groups = await getInfluencerGroups();
      if (groups.length === 0) return;
      const formattedGroups = groups.map((item: { id: number; name: string }) => {
        return {
          value: item.name,
          label: item.name,
        };
      });
      setGroups(formattedGroups);
    } catch (error) {
      console.log(groups);
    }
  };

  useEffect(() => {
    //console.log("группа инфлюенсера", influencer?.group.name);
    tryGetGroups();
  }, []);

  return (
    <div className="bg-white w-9/12 rounded-2xl shadow-2xl pt-14 px-14 pb-6">
      <div className="text-2xl">Profile</div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="mt-6 space-y-3">
          <div>
            <div className="flex">
              <CustomMultiSelectWithCreation
                name="groupName"
                options={groups}
                placeholder="Group"
                label="Group"
                className="w-1/2"
                setNewOptions={setGroups}
                maxSelectedValues={1}
              />
              <div className="w-1/2 ml-6"></div>
            </div>
          </div>
          <div className="flex justify-between">
            <FormTextInput
              name="firstname"
              autoComplete="on"
              placeholder="Will"
              label="First Name"
              className="w-6/12"
              required
            />
            <FormTextInput
              name="lastname"
              autoComplete="on"
              placeholder="Gibb"
              label="Last Name"
              className="ml-6 w-6/12"
              required
            />
          </div>
          <div className="flex justify-between">
            <FormTextInput
              name="email"
              autoComplete="on"
              placeholder="test@gmail.com"
              label="Email"
              className="w-6/12"
              required
            />
            <FormTextInput
              name="phone"
              autoComplete="on"
              placeholder="+9 (123) 213 23-23"
              label="Phone Number"
              className="ml-6 w-6/12"
              required
            />
          </div>
          <div className="flex justify-between">
            <FormTextInput
              name="mediaKitLink"
              placeholder="https://test-link.com"
              label="Media Kit Link"
              className="w-6/12"
              required
            />
            <FormTextInput
              name="tiktokProfile"
              placeholder="will_yum_gibb"
              label="TikTok Profile"
              className="ml-6 w-6/12"
              required
            />
          </div>
          <div className="flex justify-between">
            <FormTextInput
              name="instagramProfile"
              placeholder="willgibb_"
              label="Instagram Profile"
              className="w-6/12"
              required
            />
            <FormTextInput
              name="youtubeProfile"
              placeholder="will_yum_gibb"
              label="YouTube Profile (optional)"
              className="ml-6 w-6/12"
            />
          </div>
          <div className="flex justify-between">
            <div className="w-6/12">
              <FormDateInput
                control={control}
                name="contractStartDate"
                placeholder="DD/MM/YYYY"
                label="Initial End Date"
                defaultValue={
                  influencer?.contractStartDate != null
                    ? new Date(influencer.contractStartDate)
                    : undefined
                }
                required
              />
              {errors.contractStartDate && (
                <span className="mt-1 text-sm text-error">
                  {errors.contractStartDate?.message}
                </span>
              )}
            </div>
            <div className="w-6/12 ml-6">
              <FormDateInput
                control={control}
                name="contractEndDate"
                minDate={new Date(contractStartDateValue)}
                placeholder="DD/MM/YYYY"
                label="Contract End Date"
                defaultValue={
                  influencer?.contractEndDate != null
                    ? new Date(influencer.contractEndDate)
                    : undefined
                }
                required
              />
              {errors.contractEndDate && (
                <span className="mt-1 text-sm text-error">
                  {errors.contractEndDate?.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <FormTextInput
              name="streetAddress"
              placeholder="1515 Broadway, New York, NY 10036, USA"
              label="Street Address (Mailing) - Include Postcode"
              className="w-2/3"
              required
            />
            <FormSelect
              name="state"
              options={[
                { value: "NSW", label: "New South Wales" },
                { value: "QLD", label: "Queensland" },
                { value: "SA", label: "South Australia" },
                { value: "TAS", label: "Tasmania" },
                { value: "VIC", label: "Victoria" },
                { value: "WA", label: "Western Australia" },
                { value: "ACT", label: "Australian Capital Territory" },
                { value: "NT", label: "Northern Territory" },
              ]}
              placeholder="State"
              label="State"
              className="ml-6 w-1/3"
              required
            />
          </div>
          <div className="flex justify-between">
            <FormTextInputMask
              name="TFN"
              mask="999 999 999"
              placeholder="123 456 782"
              label="TFN"
              className="w-4/12"
              required
            />
            <FormTextInputMask
              name="ABN"
              mask="99 99 999 9999"
              placeholder="99 99 999 9999"
              label="ABN"
              className="ml-6 w-4/12"
              required
            />
            <FormSelect
              name="isHelp"
              options={[
                { value: "0", label: "No" },
                { value: "1", label: "Yes" },
              ]}
              placeholder="Do you need help?"
              label="HELP"
              className="ml-6 w-4/12"
              required
            />
          </div>

          <div className="flex justify-between">
            <FormTextInput
              name="bankAccountName"
              placeholder="Name and Surname"
              label="Bank Account Name"
              className="w-4/12"
              required
            />
            <FormTextInput
              name="bankBSB"
              placeholder="082178"
              label="Bank BSB"
              className="ml-6 w-4/12"
              required
            />
            <FormTextInput
              name="bankAccountNumber"
              placeholder="580050099123456789"
              label="Bank Account No."
              className="ml-6 w-4/12"
              required
            />
          </div>
          <div>
            <div className="mb-2">
              <label className="mt-4 flex space-x-3 items-center cursor-pointer">
                <Checkbox
                  checked={isPayThemselves}
                  onChange={(event) => setIsPayThemselves(event.currentTarget.checked)}
                  size="xs"
                />
                <div className="text-sm">Pay themselves</div>
              </label>
            </div>
            <div className="flex justify-between">
              <FormTextInput
                name="superFundName"
                placeholder="Super fund name"
                label="Super fund name"
                className="w-4/12"
                disabled={isPayThemselves}
                required={!isPayThemselves}
              />
              <FormTextInput
                name="superFundBillerCode"
                placeholder="Super fund biller code"
                label="Super fund biller code"
                className="ml-6 w-4/12"
                disabled={isPayThemselves}
                required={!isPayThemselves}
              />
              <FormTextInput
                name="superFundReferenceNumber"
                placeholder="Super fund reference №"
                label="Super fund reference №"
                className="ml-6 w-4/12"
                disabled={isPayThemselves}
                required={!isPayThemselves}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-6/12">
              <FormDateInput
                control={control}
                name="birthday"
                placeholder="DD/MM/YYYY"
                label="Date of Birth"
                maxDate={new Date()}
                defaultValue={
                  influencer != null ? new Date(influencer.birthday) : undefined
                }
                required
              />
              {errors.birthday && (
                <span className="mt-1 text-sm text-error">
                  {errors.birthday?.message}
                </span>
              )}
            </div>
            <FormTextInput
              name="age"
              placeholder="Age"
              label="Age"
              className="ml-6 w-6/12"
              disabled
              required
            />
          </div>
          <div className="flex justify-between">
            <FormTextInput
              name="giftIdeas"
              placeholder="Your ideas"
              label="Birthday Gift Ideas"
              className="w-6/12"
              required
            />
            <FormTextInput
              name="havePartner"
              placeholder="N"
              label="Partner & Anniversary (Y or N)"
              className="ml-6 w-6/12"
              required
            />
          </div>
          <div className="flex justify-between">
            <FormTextInput
              name="alcohol"
              placeholder="Alcohol of Choice"
              label="Alcohol of Choice"
              className="w-6/12"
              required
            />
            <FormTextInput
              name="leftOrRightHand"
              placeholder="Left or right hand"
              label="Left or Right Handed"
              className="ml-6 w-6/12"
              required
            />
          </div>
          <div className="flex justify-between">
            <FormTextInput
              name="shoeSize"
              placeholder="Shoe Size"
              label="Shoe Size"
              className="w-6/12"
              required
            />
            <FormTextInput
              name="milkOfChoice"
              placeholder="Milk of choice"
              label="Milk of choice"
              className="ml-6 w-6/12"
              required
            />
          </div>
          <div className="flex justify-between">
            <FormTextInput
              name="dreamHolidayDestination"
              placeholder="Destination"
              label="Dream Holiday Destination"
              className="w-4/12"
              required
            />
            <FormTextInput
              name="dreamBrandCollaboration"
              placeholder="Brand"
              label="Dream Brand Collaboration"
              className="ml-6 w-4/12"
              required
            />
            <FormTextInput
              name="dreamCar"
              placeholder="Brand/Model of car"
              label="Dream Car"
              className="ml-6 w-4/12"
              required
            />
          </div>
          <div className="flex justify-between">
            <FormTextInput
              name="yourPhone"
              placeholder="Model of phone"
              label="Model of phone"
              className="w-6/12"
              required
            />
            <FormTextInput
              name="yourPhoneProvider"
              placeholder="Phone Provider"
              label="Phone provider"
              className="ml-6 w-6/12"
              required
            />
          </div>
          <div className="flex justify-between">
            <FormTextInput
              name="internetProvider"
              placeholder="Internet Provider"
              label="Internet Provider (optional)"
              className="w-6/12"
            />
            <FormTextInput
              name="supermarket"
              placeholder="Supermarket"
              label="Supermarket (optional)"
              className="ml-6 w-6/12"
            />
          </div>
          <div className="flex justify-between">
            <FormTextInput
              name="chemistOfChoice"
              placeholder="Chemist of choice"
              label="Chemist of choice (optional)"
              className="w-6/12"
            />
            <FormTextInput
              name="bottleshopOfChoice"
              placeholder="Bottleshop of choice"
              label="Bottleshop of choice (optional)"
              className="ml-6 w-6/12"
            />
          </div>
          <div className="flex justify-between">
            <FormTextInput
              name="investmentService"
              placeholder="Investment Service"
              label="Investment Service (optional)"
              className="w-6/12"
            />
            <FormTextInput
              name="charityOfChoice"
              placeholder="Charity of choice"
              label="Charity of choice (optional)"
              className="ml-6 w-6/12"
            />
          </div>
          <div className="flex">
            <FormTextInput
              name="musicStreamingOfChoice"
              placeholder="Music Streaming of Choice"
              label="Music Streaming of Choice"
              className="pr-6 w-6/12"
              required
            />
            <FormTextInput
              name="streaming"
              placeholder="Streaming services"
              label="Streaming (Top 3)"
              className="ml-6 w-6/12"
              required
            />
          </div>
          <div className="flex">
            <FormTextarea
              name="notes"
              placeholder="Your extra notes"
              label="Extra notes (optional)"
              className="w-full"
            />
          </div>
          <div className="flex justify-between pt-4">
            <Button radius="xl" size="md" type="submit" color="dark">
              Save changes
            </Button>
            {isEditing && influencer && (
              <div className="flex">
                <Button
                  color={isArchived ? "orange" : "red"}
                  radius="xl"
                  size="md"
                  onClick={() => onArchiveHandler()}
                >
                  {isArchived ? "Unarchive talent" : "Archive talent"}
                </Button>
                <Button
                  className="ml-2"
                  radius="xl"
                  size="md"
                  color="red"
                  onClick={() => open()}
                >
                  Delete talent
                </Button>
              </div>
            )}
          </div>
        </form>
      </FormProvider>
      {influencer && isEditing && (
        <DeleteAccountModal opened={opened} close={close} influencerID={influencer.id} />
      )}
    </div>
  );
};
