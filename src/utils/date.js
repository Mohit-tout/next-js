// utils/date.js
export function getMaxDOB() {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);
  return today.toISOString().split('T')[0];
}

export const getFormatedDateDateField = (isoDate) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2); // Month is 0-indexed
  const day = (`0${date.getDate()}`).slice(-2);
  return `${year}-${month}-${day}`;
};

export const getFormatedDate = (isoDate) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2); // Month is 0-indexed
  const day = (`0${date.getDate()}`).slice(-2);
  return `${day}/${month}/${year}`;
};