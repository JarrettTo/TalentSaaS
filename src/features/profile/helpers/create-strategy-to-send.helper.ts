
import { strategySchema } from "@shared/lib/utils/strategy-schemas.utils";
import { IStrategy } from "@widgets/influencer";
import { TypeOf } from "zod";

type FormData = TypeOf<typeof strategySchema>;

interface IStrategyToSend extends Partial<IStrategy> {
  
}

export const createStrategyToSend = (formData: FormData, influencer: number): IStrategyToSend => {
  const dataToSend: IStrategyToSend = {
    influencer: influencer,
    manager: formData.manager,
    tasks: formData.tasks,
    PR: formData.PR,
    life: formData.life,
    high_level:formData.high_level,
    brand_strategy:formData.brand_strategy,
    content_tiktok: formData.content_tiktok,
    content_ig: formData.content_ig,
    content_yt: formData.content_yt,
    content_collabs: formData.content_collabs,
    tour: formData.tour,
    hosting: formData.hosting,
    podcast: formData.podcast,
    film: formData.film,
    projects: formData.projects
  };

  return dataToSend;
};
