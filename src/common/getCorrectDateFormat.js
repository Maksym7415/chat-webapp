/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

const months = ['дек.', 'янв.', 'февр.', 'мар.', 'апр.', 'мая', 'июн.', 'июл.', 'авг.', 'сент.', 'окт.', 'нояб.'];
const weekDays = ['вс.', 'вт.', 'ср.', 'чт.', 'пт.', 'сб', 'пн.'];

export const getCurrentDay = (value, isMessage) => {
  if (setDays(value)) return setDays(value, isMessage).split(':').map((d) => (d.length < 2 ? `0${d}` : d)).join(':');
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

const setDays = (date, isMessage) => {
  const diffInTime = Date.now() - new Date(date).getTime();
  if (isMessage) {
    return `${date.getHours()}:${date.getMinutes()}`;
  }
  if (diffInTime > 31540000000) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  } if (diffInTime > 604800000) {
    return `${date.getDate()} ${months[date.getMonth() + 1]}`;
  } if (diffInTime > 86400000) {
    return `${weekDays[date.getDay()]}`;
  }
  return `${date.getHours()}:${date.getMinutes()}`;
};
