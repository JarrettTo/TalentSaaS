const today = new Date();

export function dateToString(date: Date): string {
  let pad = function (num: number) {
    return (num < 10 ? "0" : "") + num;
  };

  return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
}

export function getCurrentDate() {
  return dateToString(today);
}

export function get7DaysAgo() {
  const date7DaysAgoInNumber = new Date().setDate(today.getDate() - 7);
  return dateToString(new Date(date7DaysAgoInNumber));
}

export function get30DaysAgo() {
  const date30DaysAgoInNumber = new Date().setDate(today.getDate() - 30);
  return dateToString(new Date(date30DaysAgoInNumber));
}

export function get90DaysAgo() {
  const date90DaysAgoInNumber = new Date().setDate(today.getDate() - 90);
  return dateToString(new Date(date90DaysAgoInNumber));
}

export function calculateAgeByBirthday(birthday: Date) {
  const today = new Date();
  const birthDateYear = birthday.getFullYear();
  const birthDateMonth = birthday.getMonth();
  const birthDateDay = birthday.getDate();

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  let age = currentYear - birthDateYear;

  if (
    currentMonth < birthDateMonth ||
    (currentMonth === birthDateMonth && currentDay < birthDateDay)
  ) {
    age--;
  }

  return age;
}
