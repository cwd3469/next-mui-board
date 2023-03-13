import { PreparationRequestDto } from '@components/preparation/history/type';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { apiHistoryPreparationRequest } from '..';
import { PREPARATIONREQUEST } from '../queryKey';

interface UsePreparationRequest {
  id: string;
}
const usePreparationRequest = (props: UsePreparationRequest) => {
  // const toast = useToastContext();
  // const msg = useCodeMsgBundle();
  // const {
  //   data: respones,
  //   isError,
  //   isLoading,
  // } = useQuery(PREPARATIONREQUEST(props.id), async () => {
  //   return await apiHistoryPreparationRequest(props.id);
  // });
  // const code = respones?.data.code;
  // const preparationData: PreparationRequestDto = isLoading
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

  const data: PreparationRequestDto | undefined = {
    name: '홍길동',
    mobileNumber: '01033035042',
    address: '부산광역시 강서구 녹산산단382로14번가길 10~29번지(송정동)',
  };
  return { data };
};

export default usePreparationRequest;
