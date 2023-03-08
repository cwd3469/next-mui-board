import React, { useCallback, useState } from 'react';
import { WTextFieldModulesType } from '../type';
import useValidation from '@hooks/utils/useValidation';
import WTextField from '../index';

const WPwTextField = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, err, setErr, disabled } = props;
  const stateTxt = state as string;
  const valid = useValidation();
  const errMsg = useCallback(() => {
    setErr(
      {
        msg: '조건에 맞는 비밀번호를 입력해 주세요.',
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

  const onFocusOut = useCallback(
    (value: string) => {
      if (valid.regPwFormChack.test(value)) {
        passMsg();
      } else {
        errMsg();
      }
    },
    [errMsg, passMsg, valid.regPwFormChack],
  );

  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value.length <= 16) {
        if (valid.regExpPassword.test(value)) {
          setState(value, keyId);
          onFocusOut(value);
        } else {
          errMsg();
        }
      }
    },
    [errMsg, keyId, onFocusOut, setState, valid.regExpPassword],
  );

  return (
    <WTextField
      type="password"
      value={stateTxt}
      onChange={onChangeInfo}
      focusOutEvent={() => onFocusOut(stateTxt)}
      disabled={disabled}
      error={err}
      maxRows={16}
      placeholder="영문 대소문자,숫자,특수문자 중 3종류 이상 포함해 주세요."
      helper={
        '최소 8자리 이상 영어 대문자, 소문자, 숫자, 특수문자 중 3종류이상 포함해 주세요.'
      }
    />
  );
};

WPwTextField.defaultProps = {
  disabled: false,
};

export default WPwTextField;
