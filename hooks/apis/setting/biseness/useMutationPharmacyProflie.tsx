import {
  WeekDataBundle,
  WeekDataBundlePharmacy,
} from '@components/setting/businessHour/type';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { apiPharmacyProflieModify, BUSINESS } from '.';

const useMutationPharmacyProflie = (props: {
  weekList?: WeekDataBundle;
  pharmacyUlid: string;
}) => {
  const { weekList, pharmacyUlid } = props;
  const queryClient = useQueryClient();
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const { mutate: mutatePharmacyProflieModify } = useMutation(
    apiPharmacyProflieModify,
  );
  const onClickPharmacyProflieModify = useCallback(() => {
    if (weekList) {
      const dto: WeekDataBundlePharmacy = {
        pharmacyUlid: pharmacyUlid,
        ...weekList,
      };
      mutatePharmacyProflieModify(dto, {
        onSuccess(res, variables, context) {
          const code = res.data.code;
          const data = res.data.data;
          if (code !== '0000') {
            toast?.on(msg.errMsg(code), 'warning');
          } else {
            queryClient.invalidateQueries(BUSINESS());
          }
        },
      });
    }
  }, [
    msg,
    mutatePharmacyProflieModify,
    pharmacyUlid,
    queryClient,
    toast,
    weekList,
  ]);
  return { onClickPharmacyProflieModify };
};

export default useMutationPharmacyProflie;
