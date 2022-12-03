const getDate = (date : Date) : string => {
  return `${ date.toLocaleString('default', { month: 'short' }) }-${ Number(date.getDate()) > 9 ? date.getDate() : '0' + date.getDate() }-${ date.getFullYear() }`;
};

export default getDate;