/* eslint-disable @typescript-eslint/restrict-template-expressions */
export default (value) => {
  if (getNormalizeDate(value)) return getNormalizeDate(value).split(':').map((d) => (d.length < 2 ? `0${d}` : d)).join(':');
  return '';
};

const getNormalizeDate = (date) => {
  if (date) return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  return date;
};
