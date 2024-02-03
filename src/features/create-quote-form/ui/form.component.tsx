import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormSchema, schema } from "../model";
import { Button } from "@mantine/core";
import { FormTextInput } from "@shared/ui";
import { useCreateQuoteMutation, useQuotePlacementsStore } from "@entities/quote";
import { PlacementTypesEnum } from "@entities/placement";
import { calculateTotalFee } from "@entities/quote/lib/utils/calculate-total-fee";

interface ICreateQuoteForm {
  onSubmit: () => void;
  onCancel: () => void;
}

export const Form = (props: ICreateQuoteForm) => {
  const { onSubmit, onCancel } = props;

  const methods = useForm<FormSchema>({ resolver: zodResolver(schema) });
  const { mutateAsync: createQuote } = useCreateQuoteMutation();
  const quotePlacements = useQuotePlacementsStore((store) => store.quotePlacements);

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleFormSubmit: SubmitHandler<FormSchema> = async (data) => {
    const filledQuotePlacements = quotePlacements.filter(
      (quotePlacement) => quotePlacement.deliverables > 0
    );
    if (filledQuotePlacements.length === 0) {
      return;
    }
    try {
      await createQuote({
        name: data.campaign,
        brand: data.brand,
        quotes: filledQuotePlacements.map((quotePlacement) => ({
          influencerId: quotePlacement.influencer.id,
          totalFee: calculateTotalFee(
            { ...quotePlacement },
            Number(quotePlacement.talantFee)
          ),
          crossPost: quotePlacement.crossPost,
          instaStorySet: quotePlacement.instaStorySet,
          linkInBio: quotePlacement.linkInBio,
          amplificationDigital: quotePlacement.amplificationDigital,
          amplificationDigitalMonths: quotePlacement.amplificationDigitalMonths,
          amplificationDigitalMonthsRange: quotePlacement.amplificationDigitalMonthsRange,
          amplificationTraditional: quotePlacement.amplificationTraditional,
          amplificationTraditionalMonths: quotePlacement.amplificationTraditionalMonths,
          amplificationTraditionalMonthsRange:
            quotePlacement.amplificationTraditionalMonthsRange,
          exclusivity: quotePlacement.exclusivity,
          exclusivityMonths: quotePlacement.exclusivityMonths,
          exclusivityMonthsRange: quotePlacement.exclusivityMonthsRange,
          shootDay: quotePlacement.shootDay,
          paidMedia: quotePlacement.paidMedia,
          UGCCreative: quotePlacement.UGCCreative,
          isInstagram: quotePlacement.type === PlacementTypesEnum.Instagram,
          isYoutube: quotePlacement.type === PlacementTypesEnum.YouTube,
          isTiktok: quotePlacement.type === PlacementTypesEnum.TikTok,
        })),
      });
      onSubmit();
    } catch (error: any) {
      console.error("create quote error:", error);
      if (error instanceof Error) {
        setError("root", { message: error.message });
        return;
      }
      setError("root", { message: "Unexpected error" });
    }
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-2">
          <FormTextInput name="brand" placeholder="Brand" />
        </div>
        <div className="mb-2">
          <FormTextInput name="campaign" placeholder="Campaign" />
        </div>
        <div className="h-8">
          {errors.root && <p className="text-sm text-error">{errors.root.message}</p>}
        </div>
        <div className="flex justify-between gap-5">
          <Button className="grow" color="dark" type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button className="grow" color="orange" type="submit">
            Create
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
