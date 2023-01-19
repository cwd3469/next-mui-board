import useMobileAuth from '@components/auth/hooks/useMobileAuth';
import useMobileAuthQuery from '@hooks/apis/auth/common/useMobileAuthQuery';
import AuthMobileView from '@components/auth/views/AuthMobileView';
import { ModalType } from '@components/common/layouts/gnb/types';
import { useCallback, useState } from 'react';
import SignupStepThree from './SignupStepThree';

const SignupStepTwo = (props: ModalType) => {
  const {
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
    onAuthTimeOut,
    onSetAuthDisabled,
  } = useMobileAuth();
  const [bgDisable, setBgDisable] = useState<boolean>(false);
  const [modalOn, setModalOn] = useState<boolean>(false);
  const { onClickMobileAuthRequest, onClickAuthCheck } = useMobileAuthQuery({
    mobileNumber: mobileValue,
    authNumber: authValue,
    onAbledAuthInput: onAbledAuthInput,
    onAuthAction: () => {
      setModalOn(true);
      setBgDisable(true);
      onSetAuthDisabled();
    },
  });

  const resetModalClose = () => {
    onClickReset();
    props.handleClose();
    setBgDisable(false);
    setModalOn(false);
  };

  return (
    <>
      <AuthMobileView
        open={props.open}
        authValue={authValue}
        mobileValue={mobileValue}
        authDisabled={authDisabled}
        bgDisable={bgDisable}
        numDisabled={numDisabled}
        authError={authError}
        mobileError={mobileError}
        authOnChange={onChangeAuthNum}
        mobileOnChange={onChangeMobile}
        onTimerDisabled={onTimerDisabled}
        focusOutEvent={onFocusOutAuthNum}
        onClickAuthNumSend={onClickMobileAuthRequest}
        signupAuthOnClick={onClickAuthCheck}
        resetModalClose={resetModalClose}
        timerActice={onAuthTimeOut}
        timerResend={onTimerDisabled}
      />
      <SignupStepThree
        mobileValue={mobileValue}
        open={modalOn}
        handleClose={resetModalClose}
      />
    </>
  );
};

export default SignupStepTwo;
