import { FilterAllOtions, FilterDateType } from '@hooks/contexts/filters/type';

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

export const transQueryUrl = (filter: FilterAllOtions) => {
  const page = filter.page ? `&page=${filter.page - 1}` : '';
  const type = filter.type ? `&type=${filter.type}` : '';
  const title = filter.title ? `&title=${filter.title}` : '';
  const keyword = filter.keyword ? `&keyword=${filter.keyword}` : '';
  const url = page + type + keyword + title;
  return url;
};

export const transQueryDate = (filter: FilterDateType) => {
  const startDate = filter.startDate ? `&startDate=${filter.startDate}` : '';
  const endDate = filter.endDate ? `&endDate=${filter.endDate}` : '';
  const day = endDate + startDate;
  return day;
};
