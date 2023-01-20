import { NoticeInterface } from '@components/notice/type';
import { HistoryInterface } from '@components/preparation/history/type';
import { FilterNoticeType } from '@hooks/contexts/filters/type';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { apiNoticeList } from '..';
import { NOTICELIST } from '../queryKey';

const useNoticeList = (parms: FilterNoticeType) => {
  // const toast = useToastContext();
  // const msg = useCodeMsgBundle();
  // const { data, isError, isLoading } = useQuery(NOTICELIST(parms), async () => {
  //   return await apiNoticeList({ filter: parms });
  // });
  // const code = data?.data.code;
  // const noticeData: NoticeInterface[] = isLoading
  //   ? []
  //   : isError
  //   ? []
  //   : code === '0000'
  //   ? data?.data.data.page.content
  //   : [];

  // const totalPages = code === '0000' ? data?.data.data.page.totalPages : 0;

  // useEffect(() => {
  //   if (data) {
  //     if (code !== '0000') {
  //       toast?.on(msg.errMsg(code), 'error');
  //     }
  //   }
  // }, [code, data, msg, toast]);

  //WAIT , PROCEED , COMPLETE
  const noticeData: NoticeInterface[] = [
    {
      ulid: '1',
      title: '챗봇 연동에 대한 안내사항',
      status: '공지',
      createAt: '2022.11.03',
      number: 1,
    },
    {
      ulid: '2',
      title: '챗봇 연동에 대한 안내사항',
      status: '업데이트',
      createAt: '2022.11.04',
      number: 2,
    },
  ];
  const totalPages = 1;

  return { noticeData, totalPages };
};

export default useNoticeList;
