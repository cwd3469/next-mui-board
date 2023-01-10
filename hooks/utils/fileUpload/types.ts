import { Dispatch, SetStateAction } from 'react';

export interface WMultiDragDrop {
  fileUpLoad: (file: File[], uidList?: UidList[], max?: number) => void;
  files: File[];
  setFileList?: Dispatch<SetStateAction<File[]>>;
  label?: string;
  target?: string;
  multi: boolean;
  limit?: number;
}

export interface UidList {
  id: string;
  src: string;
  index: number;
  type: string;
  url: string;
}

export interface FileUid {
  fileUlid: string;
  sort: number;
}

export interface FileDto extends FileUid {
  fileUrl: string;
}
