import { z } from "zod";
import { dateToString } from "./date.utils";
import { influencerHand } from "@widgets/influencer";

const optionalField = z.literal("").transform(() => {});

export const emailSchema = z
  .string()
  .min(1, { message: "The email field cannot be empty." })
  .email("This is not a valid email.");

export const passwordSchema = z
  .string()
  .min(8, "The password must be at least 8 characters long")
  .max(100, "The password must be no more than 100 characters")
  .refine(
    (value) => /^[\d\s!#$%&'()*+,./:;<=-z{|}~]*$/.test(value),
    "The password can only contain Latin letters, numbers and special characters"
  );

export const stringSchema = z
  .string()
  .min(2, { message: "The minimum field length is 2 characters" });
  export const nstringSchema = z
  .string()
  .min(0, { message: "The minimum field length is 0 characters" });
export const phoneSchema = z
  .string()
  .min(7, "The phone number must be at least 7 characters long")
  .max(24, { message: "The maximum field length is 12 characters" })
  .refine(
    (value) => /^\(?\+?[\d\(\-\s\)]+$/.test(value),
    "The phone can only contain numbers and special characters (+, -)"
  );

export const isHelpSchema = z.union([
  z
    .string({
      required_error: "The field is required",
    })
    .min(1, "The field is required"),
  z.boolean(),
]);

export const onlyNumbersSchema = z
  .string()
  .refine((value) => /^[0-9]*$/.test(value), "The field can only contain numbers");

export const TfnSchema = z
  .string()
  .refine((value) => /^\d{9}$/.test(value.replace(/[ _]/g, "")), {
    message: "The TFN field must contain 9 numbers",
  });

export const AbnSchema = z
  .string()
  .refine((value) => /^\d{11}$/.test(value.replace(/[ _]/g, "")), {
    message: "The ABN field must contain 11 numbers",
  });

export const socialAccountSchema = z
  .string()
  .refine(
    (value) => /@[A-Za-z0-9.-]+/.test(value),
    "The field must be of type '@account'"
  );

export const socialAccountSchemaOptional = z.union([
  z.literal(""),
  z.string().min(2, { message: "The minimum field length is 2 characters" }),
]);

export const havePartnerSchema = z
  .string()
  .min(1, { message: "The minimum field length is 1 character" });

export const yesOrNoSchema = z
  .string()
  .max(1, { message: "The field can only contain Y or N" })
  .refine((value) => /^[y|n|Y|N]$/.test(value), "The field can only contain Y or N");

export const dateSchemaRequired = z.coerce
  .string()
  .min(1, { message: "The date must be filled." })
  .refine((string_) => new Date() > new Date(string_), {
    message: "The date cannot be today or the future",
  });

export const contractSchemaRequired = z.coerce
  .string()
  .min(1, { message: "The date must be filled." });

export const dateSchema = z.coerce
  .string()
  .optional()
  .transform((e) => (e === "" ? "" : e));

export const groupSchema = z.array(z.string()).optional();

export function checkYesOrNo(letter: string | boolean) {
  if (typeof letter === "boolean") {
    return letter;
  } else {
    if (letter === "1") {
      return true;
    } else {
      return false;
    }
  }
}

export function checkBirthdayDate(date: string) {
  const newDate = new Date(date);
  return dateToString(newDate);
}

export function checkHand(hand: string | number) {
  if (typeof hand === "number") {
    return influencerHand.Right;
  } else {
    hand = hand.toLowerCase();

    if (hand === "left") {
      return influencerHand.Left;
    }

    return influencerHand.Right;
  }
}
