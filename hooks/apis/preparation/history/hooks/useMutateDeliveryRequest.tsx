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
            toast?.on(msg.errMsg(code), 'info');
          } else {
            return;
          }
        },
        onError: (errMsg) => {
          toast?.on(
            `택배 수거 요청에 실패하였습니다 잠시 후, 다시 시도해 주세요.`,
            'error',
          );
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
            toast?.on(msg.errMsg(code), 'info');
          } else {
            return;
          }
        },
        onError: (errMsg) => {
          toast?.on(
            `기사 호출 요청에 실패하였습니다 잠시 후, 다시 시도해 주세요.`,
            'error',
          );
        },
      });
    }
  }, [id, msg, mutateDeliveryRequest, toast]);

  return { onClickDeliveryRequest, onClicksameDayRequest };
};

export default useMutateDeliveryRequest;
