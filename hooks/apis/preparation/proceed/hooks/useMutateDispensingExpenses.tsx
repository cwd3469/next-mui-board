import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { apiDispensingExpenses, apiPrepared } from '..';
import { commaRemove } from '@utils/formatNumber';

export interface UseDispensingExpensesType {
  medicineCost?: string;
  medicineOrderUlid: string;
  onError?: () => void;
  onSuccess?: () => void;
}
const useMutateDispensingExpenses = (props: UseDispensingExpensesType) => {
  const { medicineCost, medicineOrderUlid, onError, onSuccess } = props;
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  /**useMutateDispensingExpenses 조제비 수정  useMutation*/
  const { mutate: mutateDispensingExpenses } = useMutation(
    apiDispensingExpenses,
  );
  /**useMutateDispensingExpenses 조제 완료  useMutation*/
  const { mutate: mutationPrepared } = useMutation(apiPrepared);

  /**useMutateDispensingExpenses 조제비 수정  기능*/
  const onClickDispensingExpenses = useCallback(() => {
    if (medicineCost) {
      const dto = {
        medicineCost: commaRemove(medicineCost),
        medicineOrderUlid: medicineOrderUlid,
      };
      mutateDispensingExpenses(dto, {
        onSuccess: (res) => {
          const code = res.data.code;
          if (code !== '0000') {
            toast?.on(msg.errMsg(code), 'info');
          } else {
            if (onSuccess) {
              onSuccess();
            }
            return;
          }
        },
        onError: (errMsg) => {
          toast?.on(
            `조제비 수정이 실패하였습니다 \n잠시 후, 다시 시도해 주세요`,
            'error',
          );
          if (onError) {
            onError();
          }
        },
      });
    }
  }, [
    medicineCost,
    medicineOrderUlid,
    msg,
    mutateDispensingExpenses,
    onError,
    onSuccess,
    toast,
  ]);
  /**useMutateDispensingExpenses 조제 완료 기능*/
  const onClickPreparationComplete = useCallback(() => {
    if (medicineOrderUlid) {
      const dto = {
        medicineOrderUlid: medicineOrderUlid,
      };
      mutationPrepared(dto, {
        onSuccess: (res) => {
          const code = res.data.code;
          if (code !== '0000') {
            toast?.on(msg.errMsg(code), 'info');
          } else {
            if (onSuccess) {
              onSuccess();
            }
            return;
          }
        },
        onError: (errMsg) => {
          toast?.on(
            `조제 완료가 실패하였습니다 \n잠시 후, 다시 시도해 주세요`,
            'error',
          );
          if (onError) {
            onError();
          }
        },
      });
    }
  }, [medicineOrderUlid, msg, mutationPrepared, onError, onSuccess, toast]);

  return { onClickDispensingExpenses, onClickPreparationComplete };
};

export default useMutateDispensingExpenses;
