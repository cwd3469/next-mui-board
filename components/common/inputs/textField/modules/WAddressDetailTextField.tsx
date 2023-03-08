import React, { useCallback, useState } from 'react';
import { WTextFieldModulesType } from '../type';
import useValidation from '@hooks/utils/useValidation';
import WTextField from '../index';

const WAddressDetailTextField = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, err, setErr, disabled } = props;
  const stateTxt = state as string;
  const valid = useValidation();
  const errMsg = useCallback(() => {
    setErr(
      {
        msg: '조건에 맞는 약국명을 입력해 주세요.',
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
      if (value.length <= 15) {
        if (valid.regAddressDetail.test(value)) {
          setState(value, keyId);
          passMsg();
        } else {
          errMsg();
        }
      }
    },
    [errMsg, keyId, passMsg, setState, valid.regAddressDetail],
  );

  return (
    <WTextField
      value={stateTxt}
      onChange={onChangeInfo}
      error={err}
      disabled={disabled}
      placeholder="약국상세 주소를 입력 해주세요."
      helper={'최대 15자리까지 입력 가능합니다.'}
    />
  );
};

WAddressDetailTextField.defaultProps = {
  disabled: false,
};

export default WAddressDetailTextField;
