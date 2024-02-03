import { IGetPlacementLogByInfluencerIdDto } from "@entities/placement/api/dto";
import { getPlacementLogByInfluencerId } from "@entities/placement/api/get-placement-log-by-influencer-id";
import { IPlacementLog } from "@entities/placement/lib/interfaces";
import { QueryKeys } from "@shared/lib/enums";
import { useQuery } from "@tanstack/react-query";

export function usePlacementLogByInfluencerIdQuery(
  queryParams: Partial<IGetPlacementLogByInfluencerIdDto>
) {
  const { influencerId, type } = queryParams;

  return useQuery<IPlacementLog | null, any>({
    queryKey: [
      QueryKeys.PlacementLog,
      `placement-log-influencer-${influencerId}`,
      `placement-log-type-${type}`,
    ],
    queryFn: () =>
      typeof influencerId === "number" && typeof type !== "undefined"
        ? getPlacementLogByInfluencerId({ influencerId, type })
        : null,
    enabled: typeof influencerId === "number" && typeof type !== "undefined",
  });
}
