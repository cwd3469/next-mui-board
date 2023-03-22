import { NoticeInterface } from '@components/notice/type';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { apiNoticeList } from '..';
import { NOTICELIST } from '../queryKey';
import { useRouter } from 'next/router';

const useNoticeList = () => {
  const router = useRouter();
  const query = router.query;
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const { data, isError, isLoading } = useQuery(NOTICELIST(query), async () => {
    return await apiNoticeList(query);
  });
  const code = data?.data.code;
  const noticeData: NoticeInterface[] = isLoading
    ? []
    : isError
    ? []
    : code === '0000'
    ? data?.data.data.page.content
    : [];

  const totalPages = code === '0000' ? data?.data.data.page.totalPages : 0;

  useEffect(() => {
    if (data) {
      if (code !== '0000') {
        toast?.on(msg.errMsg(code), 'error');
      }
    }
  }, [code, data, msg, toast]);

  return { noticeData, totalPages };
};

export default useNoticeList;
