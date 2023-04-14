import React, { useCallback } from 'react';
import useValidation from '@hooks/utils/useValidation';
import { WTextFieldModulesType } from '../type';
import WTextField from '../index';
import { commaRemove, mobileFormatOff } from '@utils/formatNumber';

const WBusinessNumTextField = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, err, setErr, disabled } = props;
  const stateTxt = state as string;
  const valid = useValidation();

  const errMsg = useCallback(() => {
    setErr(
      {
        msg: '10자리 사업자 등록 번호를 입력해 주세요.',
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
      if (txt.length <= 12) {
        if (valid.regBusinessNumber.test(txt)) {
          const hyphen = txt
            .replace(/[^0-9]/g, '')
            .replace(valid.regExpBusinessNum, `$1-$2-$3`);
          const unHyphen = mobileFormatOff(txt);
          setState(hyphen, keyId);
          if (unHyphen.length === 10) {
            passMsg();
          } else {
            errMsg();
          }
          return;
        } else {
          errMsg();
        }
      }
    },
    [
      errMsg,
      keyId,
      passMsg,
      setState,
      valid.regBusinessNumber,
      valid.regExpBusinessNum,
    ],
  );

  return (
    <WTextField
      value={stateTxt}
      onChange={onChangeInfo}
      placeholder={'사업자 등록번호를 입력해 주세요.'}
      disabled={disabled}
      error={err}
      onKeyDown={props.onKeyDown}
    />
  );
};

WBusinessNumTextField.defaultProps = {
  disabled: false,
};

export default WBusinessNumTextField;
