function getFormattedDate(date: Date): string {
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const hoursText = hours < 10 ? `0${hours}` : hours;
  const minutesText = minutes < 10 ? `0${minutes}` : minutes;
  return date ? `${hoursText}:${minutesText}` : '';
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getFormattedDate,
};
