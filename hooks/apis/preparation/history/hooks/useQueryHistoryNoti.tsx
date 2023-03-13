import { PreparationRequestDto } from '@components/preparation/history/type';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { apiHistoryNoti, apiHistoryPreparationRequest } from '..';
import { HISTORYSTATUS, PREPARATIONREQUEST } from '../queryKey';

const useQueryHistoryNoti = () => {
  // const toast = useToastContext();
  // const msg = useCodeMsgBundle();
  // const {
  //   data: respones,
  //   isError,
  //   isLoading,
  // } = useQuery(HISTORYSTATUS(), async () => {
  //   return await apiHistoryNoti();
  // });
  // const code = respones?.data.code;
  // const preparationData = isLoading
  //   ? undefined
  //   : isError
  //   ? undefined
  //   : code === '0000'
  //   ? respones?.data.data
  //   : undefined;

  // useEffect(() => {
  //   if (respones) {
  //     if (code !== '0000') {
  //       toast?.on(msg.errMsg(code), 'info');
  //     }
  //   }
  // }, [code, respones, msg, toast]);

  const data = {
    totalCost: '1000000',
    completedNumber: 3,
    currentDeliveryNumber: 10,
  };
  return { data };
};

export default useQueryHistoryNoti;
