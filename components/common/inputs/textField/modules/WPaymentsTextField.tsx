import React, { useCallback, useState } from 'react';
import { WTextFieldModulesType } from '../type';
import useValidation from '@hooks/utils/useValidation';
import WTextField from '../index';
import { commaAdd } from '@utils/formatNumber';

const WPaymentsTextField = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, err, setErr, disabled } = props;
  const stateTxt = state as string;
  const prefix = '원';
  const valid = useValidation();
  const errMsg = useCallback(() => {
    setErr(
      {
        msg: '금액을 입력해 주세요.',
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
  const onFocusIn = useCallback(() => {
    const last = state.slice(0, -1);
    setState(last, keyId);
  }, [keyId, setState, state]);

  const onFocusOut = useCallback(() => {
    const value = state + prefix;
    setState(value, keyId);
  }, [keyId, setState, state]);

  const onValid = useCallback(
    (txt: string) => {
      const last = txt.slice(0, -1);
      if (last !== prefix) {
        if (valid.regExpExpenses.test(txt)) {
          passMsg();
          if (txt.length < 3) {
            errMsg();
          }
        } else {
          errMsg();
        }
      } else {
        passMsg();
      }
    },
    [errMsg, passMsg, valid.regExpExpenses],
  );

  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value.length <= 9) {
        if (valid.regExpExpenses.test(value)) {
          const comma = commaAdd(value);
          setState(comma, keyId);
          onValid(comma);
        } else {
          errMsg();
        }
      }
    },
    [errMsg, keyId, onValid, setState, valid.regExpExpenses],
  );

  return (
    <WTextField
      value={stateTxt}
      onChange={onChangeInfo}
      focusInEvent={onFocusIn}
      focusOutEvent={onFocusOut}
      error={err}
      disabled={disabled}
      placeholder="조제비를 입력해 주세요."
      helper={'1,000만 원 미만까지만 입력 가능합니다.'}
      sx={{
        '& .MuiOutlinedInput-input': {
          textAlign: 'end',
        },
      }}
    />
  );
};

WPaymentsTextField.defaultProps = {
  disabled: false,
};

export default WPaymentsTextField;
