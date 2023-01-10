import React, { useCallback, useState } from 'react';
import { WTextFieldModulesType } from '../type';
import useValidation from '@hooks/utils/useValidation';
import WTextField from '../index';

const WAdminNameTextField = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, err, setErr, disabled } = props;
  const stateTxt = state as string;
  const valid = useValidation();
  const errMsg = useCallback(() => {
    setErr(
      {
        msg: '조건에 맞는 이름을 입력해 주세요.',
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
      const { value } = e.target;
      if (value.length <= 5) {
        if (valid.regKorean.test(value)) {
          setState(value, keyId);
          passMsg();
        } else {
          errMsg();
        }
      }
    },
    [errMsg, keyId, passMsg, setState, valid.regKorean],
  );

  return (
    <WTextField
      value={stateTxt}
      onChange={onChangeInfo}
      focusInEvent={passMsg}
      error={err}
      disabled={disabled}
      placeholder="담당자 이름을 입력 해주세요."
      helper={'한글만 2~5자 입력이 가능합니다.'}
    />
  );
};

WAdminNameTextField.defaultProps = {
  disabled: false,
};

export default WAdminNameTextField;
