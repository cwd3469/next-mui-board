import useMobileAuth from '@components/auth/hooks/useMobileAuth';
import AuthMobileView from '@components/auth/views/AuthMobileView';
import { ModalType } from '@components/common/layouts/gnb/types';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useCallback, useState } from 'react';
import FindAccountStepTwo from './FindAccountStepTwo';

const FindAccountStepOne = (props: ModalType) => {
  const {
    authValue,
    mobileValue,
    authDisabled,
    numDisabled,
    authError,
    mobileError,
    authRequestDisabled,
    onAbledAuthInput,
    onChangeAuthNum,
    onChangeMobile,
    onClickReset,
    onFocusOutAuthNum,
    onTimerDisabled,
    onSetAuthDisabled,
    onAuthTimeOut,
  } = useMobileAuth();
  //   const toast = useToastContext();
  const [bgDisable, setBgDisable] = useState<boolean>(false);
  const [modalOn, setModalOn] = useState<boolean>(false);
  //   const { mutate: postCommonMobileAuthMutate } = useCommonMobileAuth();
  //   const { mutate: postCommonVerifyCodeMutate } = useCommonVerifyCode();

  const resetModalClose = () => {
    onClickReset();
    props.handleClose();
    setBgDisable(false);
    setModalOn(false);
  };

  const onClickAuthNumSend = useCallback(() => {
    onAbledAuthInput();
    // const mobile: MobileNumDto = { mobileNum: mobileFormatOff(mobileValue) };
    // postCommonMobileAuthMutate(mobile, {
    //   onSuccess: (res) => {
    //     if (res.data.code !== '0000') {
    //       toast?.on(msg.errMsg(res.data.code),'error');
    //       return;
    //     }
    //     onAbledAuthInput();
    //   },
    //   onError: (err) => {
    //     toast?.on(
    //       '인증번호 발급에 실패 하였습니다. \n 잠시 후, 다시 시도해 주세요.',
    //     ,'error');
    //   },
    // });
  }, [onAbledAuthInput]);

  const signupAuthOnClick = useCallback(() => {
    setModalOn(true);
    setBgDisable(true);
    onSetAuthDisabled();
    // const data = {
    //   mobileNum: mobileFormatOff(mobileValue),
    //   code: authValue,
    // };
    // postCommonVerifyCodeMutate(data, {
    //   onSuccess: (res) => {
    //     if (res.data.status === 'SUCCESS') {
    //       setModalOn(true);
    //       setAuthDisabled(true);
    //       setBgDisable(true);
    //     }
    //     if (res.data.status === 'FAIL') {
    //       toast?.on(msg.errMsg(res.data.code) , 'error');
    //       return;
    //     }
    //   },
    //   onError: (err) => {
    //     toast?.on(
    //       '인증번호가 일치하지 않습니다 \n 잠시 후, 다시 시도해 주세요.',
    //     , 'error');
    //   },
    // });
  }, [onSetAuthDisabled]);

  return (
    <>
      <AuthMobileView
        open={props.open}
        authValue={authValue}
        mobileValue={mobileValue}
        mobileDisabled={authRequestDisabled}
        authDisabled={authDisabled}
        bgDisable={bgDisable}
        numDisabled={numDisabled}
        authError={authError}
        mobileError={mobileError}
        authOnChange={onChangeAuthNum}
        mobileOnChange={onChangeMobile}
        onTimerDisabled={onTimerDisabled}
        focusOutEvent={onFocusOutAuthNum}
        onClickAuthNumSend={onClickAuthNumSend}
        signupAuthOnClick={signupAuthOnClick}
        resetModalClose={resetModalClose}
        timerActice={onAuthTimeOut}
        timerResend={onTimerDisabled}
      />
      <FindAccountStepTwo open={modalOn} handleClose={resetModalClose} />
    </>
  );
};

export default FindAccountStepOne;
