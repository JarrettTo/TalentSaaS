import { z, TypeOf } from "zod";

export const schema = z.object({
  brand: z
    .string({
      invalid_type_error: "Invalid brand name",
      required_error: "Brand name is required",
    })
    .min(1, "Brand name is required"),
  campaign: z
    .string({
      invalid_type_error: "Invalid campaign name",
      required_error: "Campaign name is required",
    })
    .min(1, "Campaign name is required"),
});

export type FormSchema = TypeOf<typeof schema>;
