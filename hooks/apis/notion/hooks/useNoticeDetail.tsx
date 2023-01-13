import { NoticeInterface } from '@components/notice/type';
import { FilterNoticeType } from '@hooks/contexts/filters/type';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { apiNoticeDetail } from '..';
import { NOTICEDETAIL } from '../queryKey';

const useNoticeDetail = (parms: string) => {
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const { data, isError, isLoading } = useQuery(
    NOTICEDETAIL(parms),
    async () => {
      return await apiNoticeDetail(parms);
    },
  );
  const code = data?.data.code;
  const origin = {
    ulid: '',
    title: '',
    status: '',
    createAt: '',
    number: 0,
  };
  const noticeData: NoticeInterface = isLoading
    ? origin
    : isError
    ? origin
    : code === '0000'
    ? data?.data.data.page.content
    : origin;

  useEffect(() => {
    if (data) {
      if (code !== '0000') {
        toast?.on(msg.errMsg(code), 'error');
      }
    }
  }, [code, data, msg, toast]);

  return { noticeData };
};

export default useNoticeDetail;
