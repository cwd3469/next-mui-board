import { useQuery } from 'react-query';
import { apiProceedList } from '..';
import { PROCEED_LIST } from '../queryKey';
import useCodeWarningEffect from '@hooks/utils/useCodeWarningEffect';
import { ParsedUrlQuery } from 'querystring';
import { transQueryDateToString, transQueryUrl } from '@utils/transtext';
import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';

const useListProceed = (prams: {
  query: ParsedUrlQuery;
  date: DateRange<dayjs.Dayjs>;
}) => {
  const queryUrl = transQueryUrl(prams.query);
  const queryDate = transQueryDateToString(prams.query, prams.date);
  const queryString = `${queryUrl}${queryDate}`;

  const { data, isError, isLoading } = useQuery(
    PROCEED_LIST(prams.query),
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

export default useListProceed;
