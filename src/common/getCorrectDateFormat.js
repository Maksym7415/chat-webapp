const getMessageTime = (value) => {
  if (getNormalizeDate(value)) return getNormalizeDate(value).split('-').map((d) => (d.length < 2 ? `0${d}` : d)).join('-');
  return '';
};

const getNormalizeDate = (date) => {
  if (date) return `${date.getHours()}-${date.getMinutes() + 1}-${date.getSeconds()}`;

  return date;
};
