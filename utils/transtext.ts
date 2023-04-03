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
    case 'IN_PREPARE':
      return '조제 중';
    case 'OUTSTANDING':
      return '결제 대기';
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

const queryToFilter = (
  key: string,
  q: FilterAllOtions | ParsedUrlQuery,
  f?: FilterAllOtions,
) => {
  const queryKey = q[key]
    ? `&${key}=${q[key]}`
    : f
    ? f[key]
      ? `&${key}=${f[key]}`
      : ''
    : '';

  return queryKey;
};

export const transQueryUrl = (
  query: FilterAllOtions | ParsedUrlQuery,
  filter?: FilterAllOtions,
) => {
  const page = Number(query.page)
    ? `&page=${Number(query.page)}`
    : filter
    ? filter.page
      ? `&page=${filter.page}`
      : ''
    : '';
  const title = queryToFilter('title', query, filter);
  const type = queryToFilter('type', query, filter);
  const keyword = queryToFilter('keyword', query, filter);
  const medicineStatus = queryToFilter('medicineStatus', query, filter);
  const url = page + keyword + medicineStatus + type + title;
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
  date: DateRange<dayjs.Dayjs>,
) => {
  const startDate = filter.startDate
    ? `&startDate=${filter.startDate}`
    : `&startDate=${date[0] ? date[0].format('YYYY-MM-DD') : ''}`;
  const endDate = filter.endDate
    ? `&endDate=${filter.endDate}`
    : `&endDate=${date[1] ? date[1].format('YYYY-MM-DD') : ''}`;
  const day = startDate + endDate;
  return day;
};
