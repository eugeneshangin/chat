function getFormattedDate(date: Date): string {
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const hoursText = hours < 10 ? `0${hours}` : hours;
  const minutesText = minutes < 10 ? `0${minutes}` : minutes;
  return date ? `${hoursText}:${minutesText}` : '';
}

const limitHandler = (limit: number): (v: string) => string | boolean => (v: string) => (
  v.length <= limit || `Превышает лимит в ${limit} символов`);

export {
  getFormattedDate,
  limitHandler,
};
