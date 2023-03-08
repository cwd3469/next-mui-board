import { PreparationRequestDto } from '@components/preparation/history/type';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { convertURLtoFile } from '@utils/file';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { apiHistoryPrescription } from '..';
import { PRESCRIPTION } from '../queryKey';

interface usePrescriptionImageType {
  id: string;
}
const usePrescriptionImage = (props: usePrescriptionImageType) => {
  // const toast = useToastContext();
  // const msg = useCodeMsgBundle();
  // const {
  //   data: respones,
  //   isError,
  //   isLoading,
  // } = useQuery(PRESCRIPTION(props.id), async () => {
  //   return await apiHistoryPrescription(props.id);
  // });
  // const code = respones?.data.code;
  // const prescriptionData = isLoading
  //   ? undefined
  //   : isError
  //   ? undefined
  //   : code === '0000'
  //   ? respones?.data.data
  //   : undefined;

  // useEffect(() => {
  //   if (respones) {
  //     if (code !== '0000') {
  //       toast?.on(msg.errMsg(code), 'info');
  //     }
  //   }
  // }, [code, respones, msg, toast]);
  // TODO: 추후 변경할 예정

  const file = 'http://pds.dailypharm.com/news_image/202109/279981_1.jpg';

  return { file };
};

export default usePrescriptionImage;
