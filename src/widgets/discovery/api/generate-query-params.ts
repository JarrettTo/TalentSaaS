export type SortOrder = "ASC" | "DESC";

export const generateQueryParams = (
  name: SortOrder,
  state: SortOrder,
  startDate: SortOrder,
  endDate: SortOrder
) => {
  let finalQueryParams = `?order[influencer][firstname]=${name}`;
  finalQueryParams += `&order[influencer][state]=${state}`;
  finalQueryParams += `&order[influencer][contractStartDate]=${startDate}`;
  finalQueryParams += `&order[influencer][contractEndDate]=${endDate}`;
  finalQueryParams += `&order[group][name]=ASC`;

  return finalQueryParams;
};
