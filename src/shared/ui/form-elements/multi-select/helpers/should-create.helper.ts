import { SelectItem } from "@mantine/core";
import { removeSpaces } from "@shared/lib/utils";

export const shouldCreateNewOption = (query: string, data: SelectItem[]): boolean => {
  const found = data.find(
    (element) =>
      element.label &&
      removeSpaces(element.label.toLowerCase()) === removeSpaces(query.toLowerCase())
  );

  if (found || query === "") {
    return false;
  } else {
    return true;
  }
};
