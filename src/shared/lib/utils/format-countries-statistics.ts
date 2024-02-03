import { IArrayStatisticsItem } from "../types";

export function formatCountriesStatistics(
  countriesStatistics: IArrayStatisticsItem[]
): IArrayStatisticsItem[] {
  if (countriesStatistics.length === 0) {
    return [];
  }
  const filteredCountriesStatistics: IArrayStatisticsItem[] = [];
  const otherCountriesStatistics = { name: "Other countries", count: 0 };
  countriesStatistics.forEach((country, index) => {
    if (Number(country.count) <= 0) {
      return;
    }
    if (index > 4) {
      otherCountriesStatistics.count += Number(country.count);
      return;
    }
    filteredCountriesStatistics.push(country);
  });
  if (otherCountriesStatistics.count > 0) {
    filteredCountriesStatistics.push({
      ...otherCountriesStatistics,
      count: String(otherCountriesStatistics.count),
    });
  }
  return filteredCountriesStatistics;
}
