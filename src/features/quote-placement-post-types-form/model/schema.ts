import { z, TypeOf } from "zod";

export const schema = z.object({
  rePost: z.number({ invalid_type_error: "Invalid value" }),
  rePostIG: z.number({ invalid_type_error: "Invalid value" }),
  rePostYT: z.number({ invalid_type_error: "Invalid value" }),
  rePostTikTok: z.number({ invalid_type_error: "Invalid value" }),
  amplificationDigital: z.number({ invalid_type_error: "Invalid value" }),
  amplificationTraditional: z.number({ invalid_type_error: "Invalid value" }),
  exclusivity: z.number({ invalid_type_error: "Invalid value" }),
  
});

export type FormSchema = TypeOf<typeof schema>;
