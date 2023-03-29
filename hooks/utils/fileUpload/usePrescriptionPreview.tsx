import { blobToFile, dataURItoFile, resizeFileCompression } from '@utils/file';

import { useCallback, useEffect, useState } from 'react';
import { useToastContext } from '../useToastContext';
import useCodeMsgBundle from '../useCodeMsgBundle';
import { apiPrescriptionFileBase } from '@hooks/apis/preparation/request';
import { UidList } from './types';

const usePrescriptionPreview = (props: {
  medicineOrderUlid?: string;
  prescriptionUlid?: string;
  handleClose: () => void;
}) => {
  const [fileArr, setFileArr] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState<UidList[]>([]);
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const reset = useCallback(() => {
    setFileArr([]);
    setImageUrl([]);
  }, []);
  const onImagePreview = useCallback(
    async (medicineOrderUlid: string, prescriptionUlid: string) => {
      let arr: File[] = [];
      let temp: UidList[] = [];
      await apiPrescriptionFileBase(medicineOrderUlid, prescriptionUlid)
        .then(async (data) => {
          const code = data.data.code;
          if (code !== '0000') {
            toast?.on(msg.errMsg(code), 'error');
            props.handleClose();
            reset();
            return;
          } else {
            const res = data.data.data;
            const file = dataURItoFile(res, '처방전');
            const reader = new FileReader();
            let imageImg =
              file.type === 'application/pdf'
                ? file
                : file.size < 1000000
                ? file
                : await resizeFileCompression(file);
            reader.readAsDataURL(imageImg);
            reader.onload = () => {
              const csv: string = reader.result as string;
              const objectURL = URL.createObjectURL(imageImg);
              const fileObj = {
                id: imageImg.name,
                src: csv,
                index: imageImg.lastModified,
                type: imageImg.type,
                url: objectURL,
              };
              temp.push(fileObj);
              arr.push(imageImg);
            };
            reader.onloadend = () => {
              setImageUrl(temp);
              setFileArr(arr);
            };
          }
        })
        .catch((res) => {
          toast?.on(
            `처방전 조회에 실패 하셨습니다. \n 잠시후 다시 시도하세요.`,
            'error',
          );
          props.handleClose();
          reset();
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (props.medicineOrderUlid && props.prescriptionUlid) {
      onImagePreview(props.medicineOrderUlid, props.prescriptionUlid);
    }
  }, [onImagePreview, props.medicineOrderUlid, props.prescriptionUlid]);

  return { fileArr, imageUrl ,reset};
};

export default usePrescriptionPreview;
