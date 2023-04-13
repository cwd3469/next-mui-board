import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { apiDeliveryRequest } from '..';
import { HISTORY_LIST } from '../queryKey';
import { useRouter } from 'next/router';
import { OnEvent } from '../../proceed/hooks/useMutateDispensingExpenses';
import { apiQuickPayment } from '../../proceed';

interface UseDeliveryRequestType {
  id: string;
  dayRequest?: OnEvent;
}
const useMutateDeliveryRequest = (props: UseDeliveryRequestType) => {
  const { id: medicineOrderUlid, dayRequest } = props;
  const router = useRouter();
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const queryClient = useQueryClient();
  /**useMutateDispensingExpenses 배송 요청 useMutation*/
  const { mutate: mutateDeliveryRequest } = useMutation(apiDeliveryRequest);
  /**useMutateDispensingExpenses 배송비 결제 요청  useMutation*/
  const { mutate: mutationQuickPayment } = useMutation(apiQuickPayment);

  /**useMutateDeliveryRequest 택배 요청*/
  const onClickDeliveryRequest = useCallback(() => {
    if (medicineOrderUlid) {
      mutateDeliveryRequest(medicineOrderUlid, {
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
  }, [
    dayRequest,
    medicineOrderUlid,
    msg,
    mutateDeliveryRequest,
    queryClient,
    router.query,
    toast,
  ]);

  /**useMutateDeliveryRequest 당일 배송 요청*/
  const onClicksameDayRequest = useCallback(() => {
    if (medicineOrderUlid) {
      const dto = {
        medicineOrderUlid: medicineOrderUlid,
      };
      //배송비 결제 요청
      mutationQuickPayment(dto, {
        onSuccess: (res) => {
          const code = res.data.code;
          if (code !== '0000') {
            //배송비 결제 요청 실패
            toast?.on(msg.errMsg(code), 'info');
          } else {
            onClickDeliveryRequest();
            return;
          }
        },
        onError: (errMsg) => {
          //배송비 결제 요청 실패
          toast?.on(
            `조제비 결제 실패하였습니다 \n잠시 후, 다시 시도해 주세요`,
            'error',
          );
        },
      });
    }
  }, [
    medicineOrderUlid,
    msg,
    mutationQuickPayment,
    onClickDeliveryRequest,
    toast,
  ]);

  return { onClicksameDayRequest, onClickDeliveryRequest };
};

export default useMutateDeliveryRequest;
