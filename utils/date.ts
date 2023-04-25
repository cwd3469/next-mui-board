import { OptionType } from '@components/common/inputs/select';
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

export interface WTimeListOption extends OptionType {
  index: number;
}

export const timeListFn = (param: {
  start: string;
  end: string;
  Interval: number;
  viewFormat?: string;
  ListFormat?: string;
}): WTimeListOption[] => {
  const { start, end, Interval, viewFormat, ListFormat } = param;
  const startDate = dayjs(`2023-04-12T${start}:00:00`);
  const endDate = dayjs(`2023-04-12T${end}:00:00`);
  const intervalMinutes = 10;
  const timeList: WTimeListOption[] = [];
  let index = 1;
  for (
    let currentTime = startDate;
    currentTime.isBefore(endDate);
    currentTime = currentTime.add(intervalMinutes, 'minute')
  ) {
    const startTime = currentTime.format(viewFormat ? viewFormat : 'HH:mm');
    const endTime = currentTime.add(Interval, 'm').format('HH:mm');
    const itemName = `${startTime} ~ ${
      endTime === '00:00' ? '24:00' : endTime
    }`;
    const itemId = JSON.stringify({
      startTime: currentTime.format('HHmm'),
      endTime: currentTime.add(Interval, 'm').format('HHmm'),
    });
    const rangeItem: WTimeListOption = {
      index: index,
      name: itemName,
      id: itemId,
    };
    const singleItem: WTimeListOption = {
      index: index,
      name: startTime,
      id: currentTime.format('HHmm'),
    };
    index++;
    const item = () => {
      switch (ListFormat) {
        case 'range':
          return rangeItem;
        default:
          return singleItem;
      }
    };
    timeList.push(item());
  }
  return timeList;
};
