import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { apiDispensingExpenses } from '..';
import { commaRemove } from '@utils/formatNumber';

export interface UseDispensingExpensesType {
  medicineCost: string;
  medicineOrderUlid: string;
  onError?: () => void;
  onSuccess?: () => void;
}
const useMutateDispensingExpenses = (props: UseDispensingExpensesType) => {
  const { medicineCost, onError, onSuccess } = props;
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const { mutate: mutateDispensingExpenses } = useMutation(
    apiDispensingExpenses,
  );

  const onClickDispensingExpenses = useCallback(() => {
    if (medicineCost) {
      const dto = {
        medicineCost: commaRemove(props.medicineCost),
        medicineOrderUlid: props.medicineOrderUlid,
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
    msg,
    mutateDispensingExpenses,
    onError,
    onSuccess,
    props.medicineCost,
    props.medicineOrderUlid,
    toast,
  ]);

  return { onClickDispensingExpenses };
};

export default useMutateDispensingExpenses;
