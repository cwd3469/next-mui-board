import React, { useCallback } from 'react';
import useValidation from '@hooks/utils/useValidation';
import { WTextFieldModulesType } from '../type';
import WTextField from '../index';

const WPhoneTextField = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, err, setErr, disabled } = props;
  const stateTxt = state as string;
  const valid = useValidation();

  const onFocusInInfo = useCallback(() => {
    const errMsg = {
      msg: '',
      boo: false,
    };
    setErr(errMsg, keyId);
  }, [keyId, setErr]);

  const errMsg = useCallback(() => {
    setErr(
      {
        msg: '조건에 맞는 약국 전화번호를 입력해주세요.',
        boo: true,
      },
      keyId,
    );
  }, [keyId, setErr]);
  const passMsg = useCallback(() => {
    setErr(
      {
        msg: '',
        boo: false,
      },
      keyId,
    );
  }, [keyId, setErr]);

  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const txt = e.target.value;
      if (txt.length <= 20) {
        if (txt.length !== 0 && !valid.regExNumberOnly.test(txt)) {
          errMsg();
          return;
        }
        if (txt.length <= 12) {
          setState(
            txt.replace(/[^0-9]/g, '').replace(valid.regExpPhone, `$1-$2-$3`),
            keyId,
          );
          passMsg();
        }
      }
    },
    [
      errMsg,
      keyId,
      passMsg,
      setState,
      valid.regExNumberOnly,
      valid.regExpPhone,
    ],
  );

  return (
    <WTextField
      value={stateTxt}
      onChange={onChangeInfo}
      focusInEvent={onFocusInInfo}
      helper={'8~11자 이내의 약국 전화번호를 입력해 주세요.'}
      placeholder={'약국전화번호를 입력해주세요.'}
      disabled={disabled}
      error={err}
    />
  );
};

WPhoneTextField.defaultProps = {
  disabled: false,
};

export default WPhoneTextField;
