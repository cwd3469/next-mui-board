import { FilterAllOtions, FilterDateType } from '@hooks/contexts/filters/type';

export const sideDot = (txt: string, spe: string) => {
  const center = txt.substring(4);
  const dot = `${spe}${spe}${spe}${spe}${center}`;
  return dot;
};

export const transTextStateTreat = (state: string) => {
  switch (state) {
    case 'HOLD':
      return '진료 보류';
    case 'WAIT':
      return '진료 대기';
    case 'CLOSE':
      return '진료 종료';
    case 'CANCEL':
      return '진료 취소';
    default:
      return '진료 중';
  }
};

export const transTextStateReception = (state: string) => {
  switch (state) {
    case 'ACCEPT':
      return '접수 수락';
    case 'REFUSE':
      return '접수 거절';
    default:
      return '접수 대기';
  }
};

export const transQueryUrl = (filter: FilterAllOtions) => {
  const page = filter.page ? `&page=${filter.page}` : '';
  const code = filter.code === '0' ? '' : `&code=${filter.code}`;
  const keyword = filter.keyword ? `&keyword=${filter.keyword}` : '';
  const nameKo = filter.nameKo ? `&nameKo=${filter.nameKo}` : '';
  const location = filter.location
    ? filter.location !== 'DEFULT'
      ? `&location=${filter.location}`
      : ''
    : '';
  const status = filter.status
    ? filter.status !== 'DEFULT'
      ? `&status=${filter.status}`
      : ''
    : '';
  const enterType = filter.enterType
    ? filter.enterType !== 'DEFULT'
      ? `&enterType=${filter.enterType}`
      : ''
    : '';
  const isDone = filter.isDone
    ? filter.enterType !== 'DEFULT'
      ? `&isDone=${filter.isDone}`
      : ''
    : '';
  const url =
    page + code + nameKo + keyword + location + status + enterType + isDone;
  return url;
};

export const transQueryDate = (filter: FilterDateType) => {
  const startDate = filter.startDate ? `&startDate=${filter.startDate}` : '';
  const endDate = filter.endDate ? `&endDate=${filter.endDate}` : '';

  return `${endDate}${startDate}`;
};
