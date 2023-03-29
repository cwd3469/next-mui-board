import { useQuery } from 'react-query';
import { apiProceedList } from '..';
import { REQUEST_LIST } from '../queryKey';
import useCodeWarningEffect from '@hooks/utils/useCodeWarningEffect';
import { ParsedUrlQuery } from 'querystring';
import { transQueryDateToString, transQueryUrl } from '@utils/transtext';

const useListRequest = (query: ParsedUrlQuery) => {
  const queryUrl = transQueryUrl(query);
  const queryDate = transQueryDateToString(query, true);
  const queryString = `${queryUrl}${queryDate}`;

  const { data, isError, isLoading } = useQuery(
    REQUEST_LIST(query),
    async () => {
      return await apiProceedList(queryString);
    },
  );
  const code = data?.data.code;

  const { isWarning } = useCodeWarningEffect({ code: code });

  return { data, isError, isLoading, isWarning };
};

export default useListRequest;
