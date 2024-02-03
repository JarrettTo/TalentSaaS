import { IAgeArray, ICountry } from "@widgets/influencer";

export const useYoutubeInsigths = () => {
  const makeYoutubeCountryArray = (countries: ICountry[]) => {
    if (countries.length > 0) {
      const countryLabels: string[] = [];
      const countryNumbers: number[] = [];
      const totalCount = countries.reduce((acc, curr) => acc + curr.count, 0);

      const filteredCountries = countries.filter(
        (country) => !(Math.floor((country.count / totalCount) * 100) <= 1)
      );

      filteredCountries.forEach((country) => {
        countryLabels.push(country.name);
        countryNumbers.push(country.count);
      });

      return { countryLabels, countryNumbers };
    }

    return null;
  };

  const makeYoutubeAgeArray = (ages: IAgeArray) => {
    if (Object.keys(ages).length > 0) {
      const ageLabels: string[] = Object.keys(ages);
      const ageNumbers: number[] = Object.values(ages);

      ageLabels.forEach((label, index) => {
        ageLabels[index] = label.slice(3, label.length);
      });

      return { ageLabels, ageNumbers };
    }

    return null;
  };

  const makeYoutubeDevicesArray = (devices: any) => {
    const devicesLabels: string[] = Object.keys(devices);
    const devicesNumbers: number[] = Object.values(devices);
    return { devicesLabels, devicesNumbers };
  };

  return {
    makeYoutubeCountryArray,
    makeYoutubeAgeArray,
    makeYoutubeDevicesArray,
  };
};
