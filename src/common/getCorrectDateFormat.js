/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
export const getCurrentDay = (value) => {
  if (setDays(value)) return setDays(value).split(':').map((d) => (d.length < 2 ? `0${d}` : d)).join(':');
  return '';
};

export const getCurrentMonth = (value) => {
  if (setMonth(value)) return setMonth(value).split('-').map((d) => (d.length < 2 ? `0${d}` : d)).join('-');
  return '';
};

export const fullDate = (value) => {
  if (setMonth(value)) return `${getCurrentMonth(value)} ${getCurrentDay(value)}`;
  return '';
};

const setMonth = (date) => {
  if (date) return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return date;
};

const setDays = (date) => {
  if (date) return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  return date;
};
