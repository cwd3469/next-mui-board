import { NoticeInterface } from '@components/notice/type';
import {
  WeekDataBundle,
  WeekendDto,
} from '@components/setting/businessHour/type';
import { FilterNoticeType } from '@hooks/contexts/filters/type';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { getFormatTime } from '@utils/date';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { apiBusinesssSet } from '..';
import { BUSINESS } from '../queryKey';

const useBusinesssSet = () => {
  const toast = useToastContext();
  const msg = useCodeMsgBundle();

  // const { data, isError, isLoading } = useQuery(BUSINESS(), async () => {
  //   return await apiBusinesssSet();
  // });
  // const code = data?.data.code;

  // const businessData: WeekDataBundle | undefined = isLoading
  //   ? undefined
  //   : isError
  //   ? undefined
  //   : code === '0000'
  //   ? data?.data.data
  //   : undefined;

  // useEffect(() => {
  //   if (data) {
  //     if (code !== '0000') {
  //       toast?.on(msg.errMsg(code), 'error');
  //     }
  //   }
  // }, [code, data, msg, toast]);
  const weeks = [
    {
      en: 'mon',
      ko: '월요일',
    },
    {
      en: 'tue',
      ko: '화요일',
    },
    {
      en: 'wed',
      ko: '수요일',
    },
    {
      en: 'thu',
      ko: '목요일',
    },
    {
      en: 'fri',
      ko: '금요일',
    },
    {
      en: 'set',
      ko: '토요일',
    },
    {
      en: 'sun',
      ko: '일요일',
    },
    {
      en: 'holiday',
      ko: '공휴일',
    },
  ];
  const now = new Date();
  const string = getFormatTime(now);
  const bumy = {
    openTime: string,
    closeTime: string,
    hasOperation: false,
  };
  const bumytwo = {
    openTime: string,
    closeTime: string,
    hasOperation: true,
  };
  const res: WeekDataBundle = {
    mon: bumy,
    tue: bumytwo,
    wed: bumytwo,
    thu: bumytwo,
    fri: bumy,
    set: bumytwo,
    sun: bumy,
    holiday: bumy,
  };
  const businessData = res;
  return { businessData, weeks };
};

export default useBusinesssSet;
