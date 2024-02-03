import { IUpdatePlacementDto, updatePlacement } from "@entities/placement/api";
import { queryClient } from "@shared/api";
import { QueryKeys } from "@shared/lib/enums";
import { useMutation } from "@tanstack/react-query";

export function useUpdatePlacementMutation() {
  return useMutation<void, any, IUpdatePlacementDto>({
    mutationFn: updatePlacement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Placements] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PlacementLog] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PlacementsLastLogs] });
    },
  });
}
