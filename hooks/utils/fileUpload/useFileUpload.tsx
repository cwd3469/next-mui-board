/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';
import useValidation from '../useValidation';
import { UidList } from './types';
import useDropDrag from './useDropDrag';
import { blobToFile, resizeFileCompression } from '@utils/file';
import { ErrorType } from '@components/common/inputs/type';

export interface UseMultiFileUpload {
  multi: boolean;
  limit?: number;
  modifyFile: File[];
}

const useFileUpload = (props: UseMultiFileUpload) => {
  const { multi, limit, modifyFile } = props;
  const validation = useValidation();
  const [imageSrc, setImageSrc] = useState<UidList[]>([]);
  const [err, setErr] = useState<ErrorType>({ msg: '', boo: false });
  const errorMsgOn = (msg: string) => {
    setErr({ msg, boo: true });
  };

  const onDeleteuidList = (number: number) => {
    if (imageSrc.length === 1) {
      setImageSrc([]);
      return;
    }
    const newList = imageSrc.filter((item, index) => {
      return index !== number;
    });

    setImageSrc(newList);
  };

  const onFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const objectURL = URL.createObjectURL(file);
      const csv: string = reader.result as string;
      let fileObj: UidList = {
        id: file.name,
        src: csv,
        index: file.lastModified,
        type: file.type,
        url: objectURL,
      };
      setImageSrc((prec) => [...prec, fileObj]);
      setErr({ msg: '', boo: true });
      return;
    };
  };

  const onChangeFile = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any) => {
      const selectFile =
        e.type === 'drop' ? e.dataTransfer.files : e.target.files;
      if (selectFile) {
        let temp: UidList[] = [...imageSrc];
        [].forEach.call(selectFile, async function (file: File, index: number) {
          if (validation.regExpImage.test(file.type)) {
            const regBoo = validation.regExpFile.test(file.type);
            const reader = new FileReader();
            let resizeFile = regBoo ? file : await resizeFileCompression(file);
            reader.readAsDataURL(resizeFile);
            reader.onload = () => {
              const csv: string = reader.result as string;
              const objectURL = URL.createObjectURL(file);
              const fileObj = {
                id: file.name,
                src: csv,
                index: file.lastModified,
                type: file.type,
                url: objectURL,
              };

              if (multi) {
                if (limit)
                  if (temp.length >= limit) {
                    temp.shift();
                    temp = [...temp, fileObj];
                    return;
                  }
                temp.push(fileObj);
                return;
              } else {
                temp = [fileObj];
                return;
              }
            };
            reader.onloadend = () => {
              setImageSrc(temp);
              setErr({ msg: '', boo: true });
            };
          } else {
            errorMsgOn('첨부파일은 pdf, jpg, png로 된 이미지만 가능합니다.');
            return;
          }
        });
      }
    },
    [imageSrc, limit, multi, validation.regExpFile, validation.regExpImage],
  );

  const { dragRef, isDragging } = useDropDrag({ onChangeFile });

  const onModifyFile = useCallback(() => {
    if (modifyFile.length) {
      for (let i = 0; i < modifyFile.length; i++) {
        const element = modifyFile[i];
        onFile(element);
      }
    }
  }, [modifyFile]);

  return {
    onChangeFile,
    onDeleteuidList,
    onModifyFile,
    setImageSrc,
    dragRef,
    isDragging,
    imageSrc,
    err,
  };
};

export default useFileUpload;
