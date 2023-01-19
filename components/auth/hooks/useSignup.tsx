import { useCallback, useEffect, useState } from 'react';
import signupInfo from '../signup/jsons/signupInfo.json';
import { mobileFormat, mobileFormatOff } from '@utils/formatNumber';
import {
  SignupInfo,
  SignupInfoError,
  SignupInfoValue,
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

  const setInInfo = useCallback((value: SignupInfoValue, keyId: string) => {
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

  /**약국전화번호 '-' 추가*/
  const formChanger = mobileValue ? mobileFormat(mobileValue) : '';

  /**약국 정보 입력 유효성 검사 */
  const disabledOn = useCallback(() => {
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

  useEffect(() => {
    disabledOn();
  }, [disabledOn]);

  return {
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
