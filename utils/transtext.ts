import { FilterAllOtions, FilterDateType } from '@hooks/contexts/filters/type';
<<<<<<< HEAD
import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';
=======
>>>>>>> feature/PTSD-41
import { ParsedUrlQuery } from 'querystring';

export const sideDot = (txt: string, spe: string) => {
  const center = txt.substring(4);
  const dot = `${spe}${spe}${spe}${spe}${center}`;
  return dot;
};

export const transTextNotice = (state: string) => {
  switch (state) {
    case 'NOTICE':
      return '공지';
    case 'UPDATE':
      return '업데이트';
    default:
      return '-';
  }
};

export const transQueryUrl = (filter: FilterAllOtions | ParsedUrlQuery) => {
  const pageNum = Number(filter.page);
  const page = filter.page ? `&page=${pageNum - 1}` : '';
  const type = filter.type ? `&type=${filter.type}` : '';
  const title = filter.title ? `&title=${filter.title}` : '';
  const keyword = filter.keyword ? `&keyword=${filter.keyword}` : '';
  const url = page + type + keyword + title;
  return url;
};

export const transQueryDate = (date: DateRange<dayjs.Dayjs>) => {
  const start = date[0] ? date[0].format('YYYY-MM-DD') : '';
  const end = date[1] ? date[1].format('YYYY-MM-DD') : '';
  const startDate = start ? `&startDate=${start}` : '';
  const endDate = end ? `&endDate=${end}` : '';
  const day = startDate + endDate;
  return day;
};
