import { useQuery } from 'react-query';
import { apiRequestList } from '..';
import { REQUEST_LIST } from '../queryKey';
import useCodeWarningEffect from '@hooks/utils/useCodeWarningEffect';
import { ParsedUrlQuery } from 'querystring';
import { transQueryDateToString, transQueryUrl } from '@utils/transtext';
import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';

/** 조제 요청 목록 API hook */
const useListRequest = (prams: {
  query: ParsedUrlQuery;
  date: DateRange<dayjs.Dayjs>;
}) => {
  const queryUrl = transQueryUrl(prams.query);
  const queryDate = transQueryDateToString(prams.query, prams.date);
  const queryString = `${queryUrl}${queryDate}`;

  const { data, isError, isLoading } = useQuery(
    REQUEST_LIST(prams.query),
    async () => {
      return await apiRequestList(queryString);
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
