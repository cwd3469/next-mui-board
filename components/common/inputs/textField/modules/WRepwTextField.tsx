import React, { useCallback, useState } from 'react';
import { WTextFieldModulesType } from '../type';
import useValidation from '@hooks/utils/useValidation';
import WTextField from '../index';

interface WRepwTextFieldType extends WTextFieldModulesType {
  pw: string;
}

const WRepwTextField = (props: WRepwTextFieldType) => {
  const { state, setState, keyId, err, setErr, disabled, pw } = props;
  const stateTxt = state as string;
  const valid = useValidation();
  const errMsg = useCallback(() => {
    setErr(
      {
        msg: '비밀번호가 일치 하지 않습니다.',
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
      if (value === pw) {
        passMsg();
      } else {
        errMsg();
      }
    },
    [errMsg, passMsg, pw],
  );

  //임시 비밀번호 입력
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
      placeholder="비밀번호를 다시 입력해 주세요."
      helper={'비밀번호와 동일하게 입력해 주세요.'}
    />
  );
};

WRepwTextField.defaultProps = {
  disabled: false,
};

export default WRepwTextField;
