import { ICountry } from "@widgets/influencer";

interface IInstagramAgesObject {
  name: string;
  count: number;
}

export const useInstagramInsigths = () => {
  const formatInstagramObject = (array: IInstagramAgesObject[]) => {
    const fArray: number[] = [],
      mArray: number[] = [],
      uArray: number[] = [];

    array &&
      array.forEach((item) => {
        let genderLetter = item.name.slice(0, 1);
        switch (genderLetter) {
          case "F":
            fArray.push(item.count);
            break;
          case "M":
            mArray.push(item.count);
            break;
          case "U":
            uArray.push(item.count);
            break;
        }
      });

    return [fArray, mArray, uArray];
  };

  const getDiagramGenders = (array: IInstagramAgesObject[]) => {
    const arrays = formatInstagramObject(array);
    const genderArray: number[] = [];
    arrays &&
      arrays.forEach((array) => {
        const genderArrayItem = array.reduce((a, b) => a + b, 0);
        genderArray.push(genderArrayItem);
      });

    return genderArray;
  };

  const makeInstagramCountryArray = (countries: ICountry[]) => {
    if (countries && countries.length > 0) {
      const countryLabels: string[] = [];
      const countryNumbers: number[] = [];
      const totalCount = countries.reduce((acc, curr) => acc + curr.count, 0);

      const filteredCountries = countries.filter(
        (country) => !(Math.floor((country.count / totalCount) * 100) <= 1)
      );
      const filteredCount = filteredCountries.reduce(
        (acc, curr) => acc + curr.count,
        0
      );
      const otherCountriesCount = totalCount - filteredCount;

      filteredCountries.forEach((country) => {
        countryLabels.push(country.name);
        countryNumbers.push(country.count);
      });

      countryLabels.push("Other");
      countryNumbers.push(otherCountriesCount);

      return { countryLabels, countryNumbers };
    }

    return null;
  };

  return {
    getDiagramGenders,
    formatInstagramObject,
    makeInstagramCountryArray,
  };
};
