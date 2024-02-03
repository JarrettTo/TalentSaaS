export function roundNumber(number: number) {
  return number && Number.parseFloat(number.toFixed(1));
}

export function roundNumberTo2(number: number) {
  return number && Number.parseFloat(number.toFixed(2));
}

export function kFormatter(num: number) {
  if (Math.abs(num) > 999999) {
    return Math.sign(num) * +(Math.abs(num) / 1000000).toFixed(1) + "M";
  }
  if (Math.abs(num) > 999) {
    return Math.sign(num) * +(Math.abs(num) / 1000).toFixed(1) + "k";
  }
  return Math.sign(num) * +Math.abs(num).toFixed(2);
}
