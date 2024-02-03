import { getPlacements } from "@entities/placement/api";
import { IPlacement } from "@entities/placement/lib/interfaces";
import { QueryKeys } from "@shared/lib/enums";
import { useQuery } from "@tanstack/react-query";

export function usePlacementsQuery() {
  return useQuery<IPlacement[], any>({
    queryKey: [QueryKeys.Placements],
    queryFn: getPlacements,
  });
}
