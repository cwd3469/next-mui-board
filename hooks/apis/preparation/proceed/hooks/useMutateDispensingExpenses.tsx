import { PreparationRequestDto } from '@components/preparation/history/type';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useCallback, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { apiDispensingExpenses } from '..';
import { PREPARATIONREQUEST } from '../queryKey';

interface UseDispensingExpensesType {
  dispensingExpenses: string;
}
const useMutateDispensingExpenses = (props: UseDispensingExpensesType) => {
  const { dispensingExpenses } = props;
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const { mutate: mutateDispensingExpenses } = useMutation(
    apiDispensingExpenses,
  );

  const onClickDispensingExpenses = useCallback(() => {
    if (dispensingExpenses) {
      mutateDispensingExpenses(dispensingExpenses, {
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
          toast?.on(
            `조제비 수정이 실패하였습니다 \n잠시 후, 다시 시도해 주세요`,
            'error',
          );
        },
      });
    }
  }, [dispensingExpenses, msg, mutateDispensingExpenses, toast]);

  return { onClickDispensingExpenses };
};

export default useMutateDispensingExpenses;
