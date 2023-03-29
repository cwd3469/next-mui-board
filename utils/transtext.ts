import { FilterAllOtions, FilterDateType } from '@hooks/contexts/filters/type';
import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';
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

export const transMedicineStatus = (state: string) => {
  switch (state) {
    case 'REGIST':
      return '대기';
    case 'CANCEL':
      return '취소';
    case 'REFUSE':
      return '거절';
    case 'ACCEPT':
      return '수락';
    default:
      return '-';
  }
};

export const transDeliveryMethod = (state: string) => {
  switch (state) {
    case 'PARCEL':
      return '택배배송';
    case 'QUICK':
      return '당일배송';
    default:
      return '-';
  }
};

export const transQueryUrl = (filter: FilterAllOtions | ParsedUrlQuery) => {
  const pageNum = Number(filter.page);
  const page = pageNum ? `&page=${pageNum - 1}` : '&page=0';
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

export const transQueryDateToString = (
  filter: ParsedUrlQuery,
  week?: boolean,
) => {
  const weekBefore = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
  const now = dayjs().format('YYYY-MM-DD');
  const startDate = filter.startDate
    ? `&startDate=${filter.startDate}`
    : `&startDate=${week ? weekBefore : now}`;
  const endDate = filter.endDate
    ? `&endDate=${filter.endDate}`
    : `&endDate=${now}`;
  const day = startDate + endDate;
  return day;
};
