import { useCallback, useState, useEffect } from 'react';
import { useToastContext } from '@hooks/utils/useToastContext';
import useValidation from '@hooks/utils/useValidation';
import { ErrorType } from '@components/common/inputs/type';

export default function useMobileAuth() {
  const toast = useToastContext();
  const validation = useValidation();
  const errMsg = useCallback(() => {
    const msg = {
      msg: '',
      boo: false,
    };
    return msg;
  }, [])();
  /// input value
  const [mobileValue, setMobile] = useState<string>('');
  const [authValue, setAuth] = useState<string>('');

  //유효성 alert
  const [authDisabled, setAuthDisabled] = useState<boolean>(true);
  const [numDisabled, setNumDisabled] = useState<boolean>(true);
  const [mobileError, setMobileError] = useState<ErrorType>(errMsg);
  const [authError, setAuthError] = useState<ErrorType>(errMsg);

  const reset = useCallback(() => {
    setAuthDisabled(true);
    setNumDisabled(true);
    setMobileError(errMsg);
    setAuthError(errMsg);
    setMobile('');
    setAuth('');
  }, [errMsg]);

  const onSetAuthDisabled = useCallback(() => {
    setAuthDisabled(true);
  }, []);

  /**모든 모달 닫기 액션 */
  const onClickReset = useCallback(() => {
    reset();
  }, [reset]);

  /**휴대폰번호 입력 액션*/
  const onChangeMobile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      validation.mobileCheck({
        txt: e.target.value,
        pass: setMobile,
        error: setMobileError,
      });
    },
    [setMobile, validation],
  );

  /**인증번호 입력불가 해제 액션*/
  const onAbledAuthInput = useCallback(() => {
    setAuthDisabled(false);
    setAuth('');
  }, []);

  /**인증번호 입력 액션*/
  const onChangeAuthNum = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length < 7) {
        validation.onlyNumber({
          txt: e.target.value,
          pass: setAuth,
          error: setAuthError,
        });
      }
    },
    [validation],
  );

  const onFocusOutAuthNum = () => {
    if (authValue.length < 6) {
      setAuthError({
        msg: '인증번호 6자리를 입력해 주세요.',
        boo: true,
      });
    } else {
      setAuthError({
        msg: '',
        boo: false,
      });
    }
  };
  /** 타이머 온 */
  const onTimerDisabled = () => {
    toast?.on('인증번호 입력 유효 시간이 만료되었습니다', 'error');
    setAuthDisabled(true);
  };

  useEffect(() => {
    if (mobileValue.length < 12) {
      setAuthDisabled(true);
      setNumDisabled(true);
      setAuth('');
    }
  }, [mobileValue, setAuth, setAuthDisabled, setNumDisabled]);

  useEffect(() => {
    if (authValue.length === 6) {
      setNumDisabled(false);
    } else {
      setNumDisabled(true);
    }
  }, [authValue, setNumDisabled]);

  return {
    authValue,
    mobileValue,
    authDisabled,
    numDisabled,
    authError,
    mobileError,
    onAbledAuthInput,
    onChangeAuthNum,
    onChangeMobile,
    onClickReset,
    onFocusOutAuthNum,
    onTimerDisabled,
    onSetAuthDisabled,
  };
}
