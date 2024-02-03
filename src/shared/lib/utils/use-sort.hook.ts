export const useSort = () => {
  const sortByAlphabet = (array: any, reverse: boolean, field: string) => {
    const copiedArray = [...array];

    // console.log(copiedArray, reverse)

    copiedArray.sort((a, b) => {
      const firstnameA = a[field].toLowerCase();
      const firstnameB = b[field].toLowerCase();

      let comparison = 0;
      if (firstnameA < firstnameB) {
        comparison = -1;
      } else if (firstnameA > firstnameB) {
        comparison = 1;
      }

      return reverse ? comparison * -1 : comparison;
    });

    return copiedArray;
  };

  const sortByNumber = (array: any, reverse: boolean, field: string) => {
    const copiedArray = [...array];

    copiedArray.sort((a, b) => {
      const firstNumber = a[field];
      const secondNumber = b[field];

      if (reverse) {
        return firstNumber - secondNumber;
      } else {
        return secondNumber - firstNumber;
      }
    });

    return copiedArray;
  };

  return { sortByAlphabet, sortByNumber };
};
