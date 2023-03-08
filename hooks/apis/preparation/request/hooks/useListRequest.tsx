import { RequestInterface } from '@components/preparation/request/type';
import { FilterListData } from '@hooks/contexts/filters/type';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { apiProceedList } from '..';
import { HISTORYLIST } from '../queryKey';

const useListRequest = (parms: FilterListData) => {
  // const toast = useToastContext();
  // const msg = useCodeMsgBundle();
  // const { data, isError, isLoading } = useQuery(
  //   HISTORYLIST(parms),
  //   async () => {
  //     return await apiProceedList(parms);
  //   },
  // );
  // const code = data?.data.code;
  // const historyListData: HistoryInterface[] = isLoading
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
  //       toast?.on(msg.errMsg(code), 'info');
  //     }
  //   }
  // }, [code, data, msg, toast]);

  const listData: RequestInterface[] = [
    //  결제 대기 > 택배 배송
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
  ];

  const totalPages = 1;

  return { listData, totalPages };
};

export default useListRequest;
