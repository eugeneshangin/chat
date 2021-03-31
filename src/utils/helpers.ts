function getFormattedDate(date: Date): string {
  const currentDate = new Date();
  if (currentDate.getFullYear() === date.getFullYear() && date.getDay() === currentDate.getDay()) {
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const hoursText = hours < 10 ? `0${hours}` : hours;
    const minutesText = minutes < 10 ? `0${minutes}` : minutes;
    return date ? `${hoursText}:${minutesText}` : '';
  }
  return date.toLocaleString('ru-Ru', { month: 'long', day: 'numeric' });
}

const limitHandler = (limit: number): (v: string) => string | boolean => (v: string) => (
  v.length <= limit || `Превышает лимит в ${limit} символов`);

export {
  getFormattedDate,
  limitHandler,
};
