/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FileDto, FileUid } from '@hooks/utils/fileUpload/types';
import { Validation } from '@hooks/utils/useValidation';
import imageCompression from 'browser-image-compression';

export function blobToFile(theBlob: Blob, fileName: string) {
  return new File([theBlob], fileName, {
    type: theBlob.type,
  });
}
// image 파일 만들기
export const convertURLtoFile = async (url: string) => {
  if (typeof window !== 'undefined') {
    const response = await fetch(url);
    const data = await response.blob();
    const ext = url.split('.').pop();
    const filename = url.split('/').pop();
    const metadata = { type: `image/${ext}` };
    const file = new File([data], filename!, metadata);
    return file;
  }
};

export const dataURItoFile = async (dataURI: string, name: string) => {
  if (typeof window !== 'undefined') {
    const url = dataURI;
    const response = await fetch(url);
    const blob = await response.blob();
    const metadata = { type: blob.type };
    const file = new File([blob], name, metadata);
    return file;
  }
};
export const forinArr = (obj: any) => {
  let arr = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      arr.push(element);
    }
  }
  return arr;
};

export const resizeFileCompression = (file: File) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 400,
  };

  return imageCompression(file, options);
};

export const ulidSeparation = (imgList: FileDto[]) => {
  let imgFile: File[] = [];
  let imgUid: FileUid[] = [];

  for (let element of imgList) {
    const reFile = async () => {
      return await convertURLtoFile(element.fileUrl);
    };
    reFile().then((img) => {
      if (img) {
        imgFile.push(img);
        imgUid.push({
          fileUlid: element.fileUlid,
          sort: element.sort,
        });
      }
    });
  }

  let res = {
    imgFile,
    imgUid,
  };

  return res;
};

export const urlFileSeparation = async (imgList: FileDto[]) => {
  let imgFile: File[] = [];

  for (let element of imgList) {
    await convertURLtoFile(element.fileUrl).then((img) => {
      if (img) {
        imgFile.push(img);
      }
    });
  }

  return imgFile;
};
