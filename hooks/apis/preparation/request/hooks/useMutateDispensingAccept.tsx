import { PreparationRequestDto } from '@components/preparation/history/type';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useCallback, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { apiDispensingAccept, apiDispensingRefuse } from '..';
import { REQUEST_LIST } from '../queryKey';
import { useRouter } from 'next/router';

interface UseDispensingExpensesType {
  dispensingExpenses: string;
  refuseReason: string;
  medicineOrderUlid: string;
  onSuccess: () => void;
  onError: () => void;
}
const useMutateDispensingAccept = (props: UseDispensingExpensesType) => {
  const { dispensingExpenses } = props;
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: mutateDispensingAccept } = useMutation(apiDispensingAccept);
  const { mutate: mutateDispensingRefuse } = useMutation(apiDispensingRefuse);

  const onClickDispensingAccept = useCallback(() => {
    if (dispensingExpenses) {
      mutateDispensingAccept(dispensingExpenses, {
        onSuccess: (res) => {
          const code = res.data.code;
          const data = res.data.data;
          if (code !== '0000') {
            toast?.on(msg.errMsg(code), 'warning');
          } else {
            props.onSuccess();
            queryClient.invalidateQueries(REQUEST_LIST(router.query));
            return;
          }
        },
        onError: (errMsg) => {
          toast?.on(
            `조제비 수정이 실패하였습니다 \n잠시 후, 다시 시도해 주세요`,
            'error',
          );
          props.onError();
        },
      });
    }
  }, [
    dispensingExpenses,
    msg,
    mutateDispensingAccept,
    props,
    queryClient,
    router.query,
    toast,
  ]);

  const onClickMutateDispensingRefuse = useCallback(() => {
    if (props.refuseReason && props.medicineOrderUlid) {
      mutateDispensingRefuse(
        { msg: props.refuseReason, medicineOrderUlid: props.medicineOrderUlid },
        {
          onSuccess: (res) => {
            const code = res.data.code;
            const data = res.data.data;
            if (code !== '0000') {
              toast?.on(msg.errMsg(code), 'warning');
            } else {
              props.onSuccess();
              queryClient.invalidateQueries(REQUEST_LIST(router.query));
              return;
            }
          },
          onError: (errMsg) => {
            toast?.on(
              `조제비 수정이 실패하였습니다 \n잠시 후, 다시 시도해 주세요`,
              'error',
            );
            props.onError();
          },
        },
      );
    }
  }, [msg, mutateDispensingRefuse, props, queryClient, router.query, toast]);

  return { onClickDispensingAccept, onClickMutateDispensingRefuse };
};

export default useMutateDispensingAccept;
