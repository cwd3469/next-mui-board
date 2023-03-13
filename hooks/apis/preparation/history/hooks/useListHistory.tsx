import { HistoryInterface } from '@components/preparation/history/type';
import { FilterListData } from '@hooks/contexts/filters/type';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { apiHistoryList } from '..';
import { HISTORYLIST } from '../queryKey';

const useListHistory = (parms: FilterListData) => {
  // const toast = useToastContext();
  // const msg = useCodeMsgBundle();
  // const { data, isError, isLoading } = useQuery(
  //   HISTORYLIST(parms),
  //   async () => {
  //     return await apiHistoryList(parms);
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

  const historyListData: HistoryInterface[] = [
    // 일반 배송 > 대기중
    {
      ulid: '1C2Y32Y0QSD3421C2Y0QSDTEST',
      status: 'COMPLETION',
      statusNameKo: '완료',
      deliveryForm: 'DELIVERY',
      deliveryFormKo: '택배 배송',
      deliveryStatus: 'WAIT',
      deliveryStatusKo: '배송 대기',
      waybillNumber: '',
      courier: '',
      completionAt: '2023-01-16T17:22:44',
      refuseReason: '',
      treatHospitalName: '마인드힐링정신 건강의학과의원',
      treatDoctorName: '홍길동',
      treatHospitalPhone: '023004200',
    },
    // 일반 배송 > 진행중
    {
      ulid: '1C2Y32Y0QSD3421C2Y0QSDTEST',
      status: 'COMPLETION',
      statusNameKo: '완료',
      deliveryForm: 'DELIVERY',
      deliveryFormKo: '택배 배송',
      deliveryStatus: 'IN_DELIVERY',
      deliveryStatusKo: '배송 중',
      waybillNumber: '1234567890123',
      courier: '우체국 택배',
      completionAt: '2023-01-16T17:22:44',
      refuseReason: '',
      treatHospitalName: '마인드힐링정신 건강의학과의원',
      treatDoctorName: '홍길동',
      treatHospitalPhone: '023004200',
    },
    // 일반 배송 > 진행완료
    {
      ulid: '1C2Y32Y0QSD3421C2Y0QSDTEST',
      status: 'COMPLETION',
      statusNameKo: '완료',
      deliveryForm: 'DELIVERY',
      deliveryFormKo: '택배 배송',
      deliveryStatus: 'COMPLETION',
      deliveryStatusKo: '배송 완료',
      waybillNumber: '1234567890123',
      courier: '우체국 택배',
      completionAt: '2023-01-16T17:22:44',
      refuseReason: '',
      treatHospitalName: '마인드힐링정신 건강의학과의원',
      treatDoctorName: '홍길동',
      treatHospitalPhone: '023004200',
    },
    // 당일 배송 > 대기중
    {
      ulid: '1C2Y32Y0QSD3421C2Y0QSDTEST',
      status: 'COMPLETION',
      statusNameKo: '완료',
      deliveryForm: 'SAMEDAY',
      deliveryFormKo: '당일 배송',
      deliveryStatus: 'WAIT',
      deliveryStatusKo: '배송 대기',
      waybillNumber: '',
      courier: '',
      completionAt: '2023-01-16T17:22:44',
      refuseReason: '',
      treatHospitalName: '마인드힐링정신 건강의학과의원',
      treatDoctorName: '홍길동',
      treatHospitalPhone: '023004200',
    },
    // 당일 배송 > 진행중
    {
      ulid: '1C2Y32Y0QSD3421C2Y0QSDTEST',
      status: 'COMPLETION',
      statusNameKo: '완료',
      deliveryForm: 'SAMEDAY',
      deliveryFormKo: '당일 배송',
      deliveryStatus: 'IN_DELIVERY',
      deliveryStatusKo: '배송 중',
      waybillNumber: '1234567890123',
      courier: '우체국 택배',
      completionAt: '2023-01-16T17:22:44',
      refuseReason: '',
      treatHospitalName: '마인드힐링정신 건강의학과의원',
      treatDoctorName: '홍길동',
      treatHospitalPhone: '023004200',
    },
    // 당일 배송 > 진행완료
    {
      ulid: '1C2Y32Y0QSD3421C2Y0QSDTEST',
      status: 'COMPLETION',
      statusNameKo: '완료',
      deliveryForm: 'SAMEDAY',
      deliveryFormKo: '당일 배송',
      deliveryStatus: 'COMPLETION',
      deliveryStatusKo: '배송 완료',
      waybillNumber: '1234567890123',
      courier: '우체국 택배',
      completionAt: '2023-01-16T17:22:44',
      refuseReason: '',
      treatHospitalName: '마인드힐링정신 건강의학과의원',
      treatDoctorName: '홍길동',
      treatHospitalPhone: '023004200',
    },
    // 당일 배송 > 진행완료
    {
      ulid: '1C2Y32Y0QSD3421C2Y0QSDTEST',
      status: 'CANCEL',
      statusNameKo: '취소',
      deliveryForm: 'SAMEDAY',
      deliveryFormKo: '당일 배송',
      deliveryStatus: 'WAIT',
      deliveryStatusKo: '배송 대기',
      waybillNumber: '',
      courier: '',
      completionAt: '2023-01-16T17:22:44',
      refuseReason: '내부 사정으로 인한 취소 사유입니다.',
      treatHospitalName: '마인드힐링정신 건강의학과의원',
      treatDoctorName: '홍길동',
      treatHospitalPhone: '023004200',
    },
  ];

  const totalPages = 1;

  return { historyListData, totalPages };
};

export default useListHistory;
