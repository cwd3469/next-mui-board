import React, { useCallback } from 'react';
import useValidation from '@hooks/utils/useValidation';
import { WTextFieldModulesType } from '../type';
import WTextField from '../index';

const WPhoneTextField = (props: WTextFieldModulesType) => {
  const stateTxt = props.state as string;
  const valid = useValidation();

  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const txt = e.target.value;
      if (valid.regExpPhoneNumber.test(txt)) {
        if (txt.length < 12) {
          props.setState(txt, props.keyId);
          if (txt.length < 8) {
            props.setErr(
              {
                msg: '조건에 맞는 전화번호를 입력해 주세요.',
                boo: true,
              },
              props.keyId,
            );
          } else {
            props.setErr(
              {
                msg: '',
                boo: false,
              },
              props.keyId,
            );
          }
        }
      } else {
        props.setErr(
          {
            msg: '조건에 맞는 전화번호를 입력해 주세요.',
            boo: true,
          },
          props.keyId,
        );
      }
    },
    [props, valid.regExpPhoneNumber],
  );

  return (
    <WTextField
      value={stateTxt}
      onChange={onChangeInfo}
      helper={'8~11자 이내의 약국 전화번호를 입력해 주세요.'}
      placeholder={'약국전화번호를 입력해 주세요.'}
      disabled={props.disabled}
      error={props.err}
      onKeyDown={props.onKeyDown}
    />
  );
};

WPhoneTextField.defaultProps = {
  disabled: false,
};

export default WPhoneTextField;
