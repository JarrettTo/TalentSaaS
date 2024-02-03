import { parse } from "date-fns";

export function dateInputParser(dateString: string) {
  let newDate = parse(dateString, "dd/MM/yyyy", new Date());
  if (isNaN(newDate.getTime())) {
    newDate = parse(dateString, "dd-MM-yyyy", new Date());
    if (isNaN(newDate.getTime())) {
      return null;
    }
  }
  return newDate;
}
