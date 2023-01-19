import { HistoryInterface } from '@components/preparation/history/type';
import { FilterListData } from '@hooks/contexts/filters/type';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { apiHistoryList } from '..';
import { HISTORYLIST } from '../queryKey';

const useListHistory = (parms: FilterListData) => {
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const { data, isError, isLoading } = useQuery(
    HISTORYLIST(parms),
    async () => {
      return await apiHistoryList(parms);
    },
  );
  const code = data?.data.code;
  const historyListData: HistoryInterface[] = isLoading
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

  return { historyListData, totalPages };
};

export default useListHistory;
