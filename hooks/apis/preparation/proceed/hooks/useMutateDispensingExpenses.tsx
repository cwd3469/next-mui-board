import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { apiDispensingExpenses, apiPrepared } from '..';
import { commaRemove } from '@utils/formatNumber';

export interface UseDispensingExpensesType {
  medicineCost?: string;
  medicineOrderUlid: string;
  modifyCoast?: {
    onError?: () => void;
    onSuccess?: () => void;
  };
  completeCoast?: {
    onError?: () => void;
    onSuccess?: () => void;
  };
}
const useMutateDispensingExpenses = (props: UseDispensingExpensesType) => {
  const { medicineCost, medicineOrderUlid, modifyCoast, completeCoast } = props;
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
            if (modifyCoast) {
              if (modifyCoast.onSuccess) {
                modifyCoast.onSuccess();
              }
            }

            return;
          }
        },
        onError: (errMsg) => {
          toast?.on(
            `조제비 수정이 실패하였습니다 \n잠시 후, 다시 시도해 주세요`,
            'error',
          );
          if (modifyCoast) {
            if (modifyCoast.onError) {
              modifyCoast.onError();
            }
          }
        },
      });
    }
  }, [
    medicineCost,
    medicineOrderUlid,
    mutateDispensingExpenses,
    toast,
    msg,
    modifyCoast,
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
            if (completeCoast) {
              if (completeCoast.onSuccess) {
                completeCoast.onSuccess();
              }
            }
            return;
          }
        },
        onError: (errMsg) => {
          toast?.on(
            `조제 완료가 실패하였습니다 \n잠시 후, 다시 시도해 주세요`,
            'error',
          );
          if (completeCoast) {
            if (completeCoast.onError) {
              completeCoast.onError();
            }
          }
        },
      });
    }
  }, [completeCoast, medicineOrderUlid, msg, mutationPrepared, toast]);

  return { onClickDispensingExpenses, onClickPreparationComplete };
};

export default useMutateDispensingExpenses;
