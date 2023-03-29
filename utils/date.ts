import dayjs from 'dayjs';

export const stringToDate = (txt: string) => {
  const h = txt.substring(0, 2);
  const m = txt.substring(2, 4);
  const now = '2022-12-06';
  return new Date(`${now} ${h}:${m}`);
};

export const getFormatTime = (date: Date) => {
  let hh = String(date.getHours());
  hh = Number(hh) >= 10 ? hh : '0' + hh;
  let mm = String(date.getMinutes());
  mm = Number(mm) >= 10 ? mm : '0' + mm;
  return `${hh}${mm}`;
};

export const dateFormat = (date: string) => {
  let dayTime = dayjs(date).format('YYYY.MM.DD. HH:mm');
  let day = dayjs(date).format('YYYY.MM.DD.');
  let time = dayjs(date).format('HH:mm');
  return { dayTime, day, time };
};

export const stringToDey = (txt: string) => {
  const day = dayjs(txt);
  return day;
};
