import { z } from "zod";
import {
  dateSchema,
  nstringSchema, onlyNumbersSchema,

} from "./validation.utils";

export const strategySchema = z.object({
  influencer: onlyNumbersSchema,
  manager: nstringSchema,
  tasks: nstringSchema,
  PR: nstringSchema,
  life: nstringSchema,
  high_level:nstringSchema,
  brand_strategy:nstringSchema,
  content_tiktok: nstringSchema,
  content_ig: nstringSchema,
  content_yt: nstringSchema,
  content_collabs: nstringSchema,
  tour: nstringSchema,
  hosting: nstringSchema,
  podcast: nstringSchema,
  film: nstringSchema,
  projects: nstringSchema
});
