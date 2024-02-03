import { getPlacementsLastLogs } from "@entities/placement/api";
import { IPlacementLastLog } from "@entities/placement/lib/interfaces";
import { QueryKeys } from "@shared/lib/enums";
import { useQuery } from "@tanstack/react-query";

export function usePlacementsLastLogsQuery() {
  return useQuery<IPlacementLastLog[], any>({
    queryKey: [QueryKeys.PlacementsLastLogs],
    queryFn: getPlacementsLastLogs,
  });
}
