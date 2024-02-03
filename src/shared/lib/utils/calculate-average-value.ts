export function calculateAverageValue(numbersArray: number[]): number {
  if (numbersArray.length === 0) {
    return 0;
  }
  const numbersSum = numbersArray.reduce((sum, number) => (sum += number), 0);
  return numbersSum / numbersArray.length;
}
