import { PreparationRequestDto } from '@components/preparation/history/type';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { apiProceedNoti } from '..';
import { HISTORYSTATUS, PREPARATIONREQUEST } from '../queryKey';

const useQueryRequestNoti = () => {
  // const toast = useToastContext();
  // const msg = useCodeMsgBundle();
  // const {
  //   data: respones,
  //   isError,
  //   isLoading,
  // } = useQuery(HISTORYSTATUS(), async () => {
  //   return await apiProceedNoti();
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
    currentRequestsNumber: 8,
  };
  return { data };
};

export default useQueryRequestNoti;
