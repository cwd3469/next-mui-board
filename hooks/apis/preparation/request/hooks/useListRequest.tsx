import { RequestInterface } from '@components/preparation/request/type';
import { FilterListData } from '@hooks/contexts/filters/type';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { apiProceedList } from '..';
import { HISTORYLIST } from '../queryKey';
import useCodeWarningEffect from '@hooks/utils/useCodeWarningEffect';
import { AxiosResponse } from 'axios';
import { ParsedUrlQuery } from 'querystring';
import { transQueryUrl } from '@utils/transtext';

const useListRequest = (query: ParsedUrlQuery) => {
  useEffect(() => {
    // const queryUrl = transQueryUrl(query);
    // console.log('=============');
    // console.log(queryUrl);
    // console.log(query);
    // console.log('=============');
  }, [query]);
  // const { data, isError, isLoading } = useQuery(
  //   HISTORYLIST(parms),
  //   async () => {
  //     return await apiProceedList(parms);
  //   },
  // );
  // const code = data?.data.code;

  // const { isWarning } = useCodeWarningEffect({ code: code });
  // info.data.data.page.content
  const data: any = {
    data: {
      code: '0000',
      data: {
        page: {
          content: [
            {
              ulid: '1C2Y32Y0QSD3421C2Y0QSDTEST',
              status: 'PAYMENT_WAITING',
              statusNameKo: '결제 대기',
              deliveryForm: 'DELIVERY',
              deliveryFormKo: '택배 배송',
              waybillNumber: '',
              courier: '',
              completionAt: '2023-01-16T17:22:44',
              treatHospitalName: '마인드힐링정신 건강의학과의원',
              treatDoctorName: '홍길동',
              treatHospitalPhone: '023004200',
            },
          ],
          totalPages: 1,
        },
      },
    },
  };
  const isError = false;
  const isLoading = false;
  const isWarning = false;
  return { data, isError, isLoading, isWarning };
};

export default useListRequest;
