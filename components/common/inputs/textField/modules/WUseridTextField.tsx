import React, { useCallback } from 'react';
import useValidation from '@hooks/utils/useValidation';
import { WTextFieldModulesType } from '../type';
import WTextField from '../index';

const WUseridTextField = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, err, setErr, disabled } = props;
  const stateTxt = state as string;
  const valid = useValidation();

  const successMsg = useCallback(() => {
    const errMsg = {
      msg: '',
      boo: false,
    };
    setErr(errMsg, keyId);
  }, [keyId, setErr]);

  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value: txt } = e.target;
      const errorMsg = () =>
        setErr(
          {
            msg: '조건에 맞는 아이디를 입력해주세요.',
            boo: true,
          },
          keyId,
        );

      if (txt.length <= 20) {
        if (valid.regExpId.test(txt)) {
          setState(txt, keyId);
          if (valid.regExpIdEnglishOnly.test(txt)) {
            errorMsg();
            return;
          }
          if (valid.regExpIdNumberOnly.test(txt)) {
            errorMsg();
            return;
          }
          if (valid.regExpIdCheck.test(txt)) {
            successMsg();
          } else {
            errorMsg();
          }
        } else {
          errorMsg();
        }
      }
    },
    [
      keyId,
      setErr,
      setState,
      successMsg,
      valid.regExpId,
      valid.regExpIdCheck,
      valid.regExpIdEnglishOnly,
      valid.regExpIdNumberOnly,
    ],
  );

  return (
    <WTextField
      value={stateTxt}
      onChange={onChangeInfo}
      helper={'영문 또는 숫자 조합으로 최대  4~20자 이내로 입력해 주세요.'}
      placeholder={'4자 이상의 영문 소문자 또는 숫자를 입력해 주세요.'}
      disabled={disabled ? disabled : false}
      error={err}
    />
  );
};

WUseridTextField.defaultProps = {
  disabled: false,
};

export default WUseridTextField;
