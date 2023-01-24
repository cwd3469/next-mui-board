import { PreparationRequestDto } from '@components/preparation/history/type';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useCallback, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { apiDeliveryRequest, apiHistoryPreparationRequest } from '..';
import { PREPARATIONREQUEST } from '../queryKey';

interface UseDeliveryRequestType {
  id: string;
}
const useMutateDeliveryRequest = (props: UseDeliveryRequestType) => {
  const { id } = props;
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const { mutate: mutateDeliveryRequest } = useMutation(apiDeliveryRequest);

  const onClickDeliveryRequest = useCallback(() => {
    if (id) {
      mutateDeliveryRequest(id, {
        onSuccess: (res) => {
          const code = res.data.code;
          const data = res.data.data;
          if (code !== '0000') {
            toast?.on(msg.errMsg(code), 'warning');
          } else {
            return;
          }
        },
        onError: (errMsg) => {
          toast?.on(`아이디 또는 비밀번호를 확인해 주세요.`, 'error');
        },
      });
    }
  }, [id, msg, mutateDeliveryRequest, toast]);

  const onClicksameDayRequest = useCallback(() => {
    if (id) {
      mutateDeliveryRequest(id, {
        onSuccess: (res) => {
          const code = res.data.code;
          const data = res.data.data;
          if (code !== '0000') {
            toast?.on(msg.errMsg(code), 'warning');
          } else {
            return;
          }
        },
        onError: (errMsg) => {
          toast?.on(`아이디 또는 비밀번호를 확인해 주세요.`, 'error');
        },
      });
    }
  }, [id, msg, mutateDeliveryRequest, toast]);

  return { onClickDeliveryRequest, onClicksameDayRequest };
};

export default useMutateDeliveryRequest;
