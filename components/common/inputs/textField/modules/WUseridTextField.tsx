import React, { useCallback } from 'react';
import useValidation from '@hooks/utils/useValidation';
import { WTextFieldModulesType } from '../type';
import WTextField from '../index';

const WUseridTextField = (props: WTextFieldModulesType) => {
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

  const onFocusOutInfo = useCallback(
    (txt: string) => {
      if (!valid.regExEng.test(txt)) {
        const errMsg = {
          msg: '조건에 맞는 아이디를 입력해 주세요.',
          boo: true,
        };
        setErr(errMsg, keyId);
        return;
      }
      if (txt.length < 4) {
        const errMsg = {
          msg: '조건에 맞는 아이디를 입력해 주세요.',
          boo: true,
        };
        setErr(errMsg, keyId);
        return;
      }
    },
    [keyId, setErr, valid.regExEng],
  );

  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      if (text.length <= 20) {
        if (valid.regExpId.test(text)) {
          setState(text, keyId);
          const msg = { msg: '', boo: false };
          setErr(msg, keyId);
          onFocusOutInfo(text);
        } else {
          const errMsg = {
            msg: '조건에 맞는 아이디를 입력해 주세요.',
            boo: true,
          };
          setErr(errMsg, keyId);
        }
      }
    },
    [keyId, onFocusOutInfo, setErr, setState, valid.regExpId],
  );

  return (
    <WTextField
      value={stateTxt}
      onChange={onChangeInfo}
      focusOutEvent={() => onFocusOutInfo(stateTxt)}
      focusInEvent={onFocusInInfo}
      helper={'영문, 숫자 최대 20자리 까지 입력이 가능합니다.'}
      placeholder={'아이디를 입력해주세요.'}
      disabled={disabled ? disabled : false}
      error={err}
    />
  );
};

WUseridTextField.defaultProps = {
  disabled: false,
};

export default WUseridTextField;
