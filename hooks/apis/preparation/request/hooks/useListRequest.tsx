import { useQuery } from 'react-query';
import { apiProceedList } from '..';
import { REQUEST_LIST } from '../queryKey';
import useCodeWarningEffect from '@hooks/utils/useCodeWarningEffect';
import { ParsedUrlQuery } from 'querystring';
import { transQueryDateToString, transQueryUrl } from '@utils/transtext';

/** 조제 요청 목록 API hook */
const useListRequest = (query: ParsedUrlQuery) => {
  const queryUrl = transQueryUrl(query);
  const queryDate = transQueryDateToString(query);
  const queryString = `${queryUrl}${queryDate}`;

  const { data, isError, isLoading } = useQuery(
    REQUEST_LIST(query),
    async () => {
      return await apiProceedList(queryString);
    },
    {
      refetchInterval: 3000,
    },
  );
  const code = data?.data.code;

  const { isWarning } = useCodeWarningEffect({ code: code });

  return { data, isError, isLoading, isWarning };
};

export default useListRequest;
