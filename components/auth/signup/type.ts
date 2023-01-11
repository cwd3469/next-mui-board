import { ErrorType } from '@components/common/inputs/type';
import { ModalType } from '@components/common/layouts/gnb/types';

export interface BusiNumber {
  oneNum: string;
  twoNum: string;
  threeNum: string;
}

export interface SignupStepThreeType extends ModalType {
  mobileValue: string;
}

export interface SignupFileUlid {
  bizCertFileUlid: string;
  telecomUseCertFileUlid: string;
  passbookCopyFileUlid: string;
}

export interface SignupInfo {
  [key: string]: string;
  id: string;
  pw: string;
  rePw: string;
  addressDetail: string;
  name: string;
  buisNum: string;
  postCode: string;
  pharmacyName: string;
  pharmacyAddress: string;
  pharmacyPhone: string;
  pharmacyTaxNum: string;
  businessLicense: string;
  pharmacistLicense: string;
  bankbookCopy: string;
}

export interface SignupInfoError {
  [key: string]: ErrorType;
  idErr: ErrorType;
  pwErr: ErrorType;
  rePwErr: ErrorType;
  addressDetailErr: ErrorType;
  nameErr: ErrorType;
  buisNumErr: ErrorType;
  pharmacyNameErr: ErrorType;
  pharmacyAddressErr: ErrorType;
  pharmacyPhoneErr: ErrorType;
  pharmacyTaxNumErr: ErrorType;
}
