import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { apiDeliveryRequest } from '..';
import { HISTORY_LIST } from '../queryKey';
import { useRouter } from 'next/router';
import { OnEvent } from '../../proceed/hooks/useMutateDispensingExpenses';

interface UseDeliveryRequestType {
  id: string;
  dayRequest?: OnEvent;
}
const useMutateDeliveryRequest = (props: UseDeliveryRequestType) => {
  const { id, dayRequest } = props;
  const router = useRouter();
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const queryClient = useQueryClient();
  const { mutate: mutateDeliveryRequest } = useMutation(apiDeliveryRequest);

  /**useMutateDeliveryRequest 당일 배송 요청*/
  const onClicksameDayRequest = useCallback(() => {
    if (id) {
      mutateDeliveryRequest(id, {
        onSuccess: (res) => {
          const code = res.data.code;
          if (code !== '0000') {
            toast?.on(msg.errMsg(code), 'info');
          } else {
            if (dayRequest && dayRequest.onSuccess) {
              dayRequest.onSuccess();
            }
            queryClient.invalidateQueries(HISTORY_LIST(router.query));
            return;
          }
        },
        onError: (errMsg) => {
          if (dayRequest && dayRequest.onError) {
            dayRequest.onError();
          }
          toast?.on(
            `기사 호출 요청에 실패하였습니다 잠시 후, 다시 시도해 주세요.`,
            'error',
          );
        },
      });
    }
  }, [id, msg, mutateDeliveryRequest, queryClient, router.query, toast]);

  return { onClicksameDayRequest };
};

export default useMutateDeliveryRequest;
