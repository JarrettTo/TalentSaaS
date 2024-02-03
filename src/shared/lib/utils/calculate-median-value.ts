export function calculateMedianValue(numbersArray: number[]): number {
  if (numbersArray.length === 0) {
    return 0;
  }
  const sortedNumbersArray = [...numbersArray].sort((a, b) => a - b);
  if (sortedNumbersArray.length % 2 === 0) {
    const middleValueIndex = sortedNumbersArray.length / 2;
    const firstMiddleValue = sortedNumbersArray[middleValueIndex];
    const secondMiddleValue = sortedNumbersArray[middleValueIndex - 1];
    if (firstMiddleValue === undefined || secondMiddleValue === undefined) {
      return 0;
    }
    return (firstMiddleValue + secondMiddleValue) / 2;
  }
  const middleValueIndex = Math.floor(sortedNumbersArray.length / 2);
  return sortedNumbersArray[middleValueIndex] || 0;
}
