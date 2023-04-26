import {
  WeekDataBundle,
  WeekDataBundlePharmacy,
} from '@components/setting/businessHour/type';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { apiPharmacyProflieModify, BUSINESS } from '.';
import { PharmacistMobileNum } from '@components/setting/businessHour/BusinessHourPage';

const useMutationPharmacyProflie = (props: {
  weekList?: WeekDataBundle;
  pharmacyUlid: string;
  mobiles: PharmacistMobileNum;
}) => {
  const { weekList, pharmacyUlid, mobiles } = props;
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
        ...mobiles,
      };

      mutatePharmacyProflieModify(dto, {
        onSuccess(res, variables, context) {
          const code = res.data.code;
          const data = res.data.data;
          if (code !== '0000') {
            toast?.on(msg.errMsg(code), 'info');
          } else {
            queryClient.invalidateQueries(BUSINESS());
          }
        },
      });
    }
  }, [
    mobiles,
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
