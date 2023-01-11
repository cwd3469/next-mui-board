import { useCallback, useEffect, useState } from 'react';
import signupInfo from '../signup/jsons/signupInfo.json';
import { mobileFormat, mobileFormatOff } from '@utils/formatNumber';
import {
  SignupInfo,
  SignupInfoError,
  SignupStepThreeType,
} from '../signup/type';
import { ErrorType } from '@components/common/inputs/type';

const useSignup = (props: SignupStepThreeType) => {
  const { open, handleClose, mobileValue } = props;
  const originData = JSON.parse(JSON.stringify(signupInfo));
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [info, setInfo] = useState<SignupInfo>(originData.data);
  const [infoErr, setInfoErr] = useState<SignupInfoError>(originData.errs);
  const [btnDisable, setBtnDisable] = useState<boolean>(true);

  const setInInfo = useCallback((value: string, keyId: string) => {
    setInfo((prec) => {
      return { ...prec, [keyId]: value };
    });
  }, []);
  const setInInfoErr = useCallback((err: ErrorType, keyId: string) => {
    setInfoErr((prec) => {
      return { ...prec, [keyId + 'Err']: err };
    });
  }, []);

  const reset = useCallback(() => {
    setInfo(originData.data);
    setInfoErr(originData.errs);

    setBtnDisable(true);
  }, [originData]);

  const handleCloseAll = useCallback(() => {
    reset();
    handleClose();
    setModalOn(false);
  }, [handleClose, reset]);

  const addressOnChange = useCallback(
    (address: string, postCode: string) => {
      setInfo({
        ...info,
        ['pharmacyAddress']: address,
        ['postCode']: postCode,
      });
    },
    [info],
  );

  /**병원전화번호 '-' 추가*/
  const formChanger = mobileValue ? mobileFormat(mobileValue) : '';

  /**병원 정보 입력 유효성 검사 */

  const disabledOn = useCallback(() => {
    console.log(info);
    console.log('-------------------------------');
    console.log(infoErr);
    console.log('-------------------------------');
    for (const key in info) {
      if (Object.prototype.hasOwnProperty.call(info, key)) {
        const element = info[key];
        if (element) {
          for (const k in infoErr) {
            if (Object.prototype.hasOwnProperty.call(infoErr, k)) {
              const el = infoErr[k];
              if (el.boo) {
                setBtnDisable(true);
                return;
              }
              if (!el.boo) {
                setBtnDisable(false);
              }
            }
          }
        } else {
          setBtnDisable(true);
          return;
        }
      }
    }
  }, [info, infoErr]);

  /**회원가입 신청 이벤트 */
  const signInfoDto = useCallback(() => {
    let dto = {
      accountId: info.id,
      password: info.pw,
      reenterPassword: info.rePw,
      adminNameKo: info.name,
      adminMobileNum: mobileFormatOff(mobileValue),

      pharmacyTaxNum: info.pharmacyTaxNum,
      pharmacyName: info.pharmacyName,
      pharmacyPhone: info.pharmacyPhone
        ? mobileFormatOff(info.pharmacyPhone)
        : '',

      hospitalAddr: info.pharmacyAddress,
      hospitalAddrDetail: info.addressDetail,
      hospitalZipCode: info.postCode,
      bizRegNum: info.buisNum,
      bizCertFileUlid: info.businessLicense,
      telecomUseCertFileUlid: info.pharmacistLicense,
      passbookCopyFileUlid: info.bankbookCopy,
    };
    return dto;
  }, [
    info.id,
    info.pw,
    info.rePw,
    info.name,
    info.pharmacyTaxNum,
    info.pharmacyName,
    info.pharmacyPhone,
    info.pharmacyAddress,
    info.addressDetail,
    info.postCode,
    info.buisNum,
    info.businessLicense,
    info.pharmacistLicense,
    info.bankbookCopy,
    mobileValue,
  ])();

  useEffect(() => {
    disabledOn();
  }, [disabledOn]);

  return {
    signInfoDto,
    formChanger,
    btnDisable,
    infoErr,
    modalOn,
    info,
    open,
    addressOnChange,
    handleCloseAll,
    setInInfoErr,
    setInInfo,
  };
};

export default useSignup;
