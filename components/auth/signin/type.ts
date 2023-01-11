import { ErrorType } from '@components/common/inputs/type';
import { ModalType } from '@components/common/layouts/gnb/types';

export type SigninState =
  | 'disable'
  | 'dormant'
  | 'not-approved'
  | 'first'
  | 'excess'
  | 'success';

export interface ProcessType extends ModalType {
  label: SigninState;
  position: string;
  tokenList: { accessToken: string; refreshToken: string };
}

export interface SigninDto {
  [key: string]: string;
  accountId: string;
  password: string;
}

export interface SigninErr {
  [key: string]: ErrorType;
  accountId: ErrorType;
  password: ErrorType;
}
