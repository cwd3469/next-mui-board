import WTextField from '@components/common/inputs/textField';
import WAlert from '@components/common/modals/WAlert';
import { Box, Grid, Stack } from '@mui/material';
import AuthTimer from '../inputs/AuthTimer';
import { AuthButton, TermsGrid } from '../signup/styled';
import { AuthMobileViewType } from '../types';

const AuthMobileView = (props: AuthMobileViewType) => {
  const {
    open,
    //value
    authValue,
    mobileValue,
    //인증 코드 활성화
    numDisabled,
    bgDisable,
    mobileDisabled,
    authDisabled,
    //error
    mobileError,
    authError,
    // value onChange
    authOnChange,
    mobileOnChange,
    // focusOut
    focusOutEvent,
    // api
    onClickAuthNumSend,
    signupAuthOnClick,
    // 모달 닫기
    resetModalClose,
    // 타이머 이벤트
    timerActice,
    timerResend,
  } = props;

  return (
    <WAlert
      open={open}
      handleClose={resetModalClose}
      maxWidth={'xl'}
      handleEvent={signupAuthOnClick}
      bgDisable={bgDisable}
      disabled={numDisabled}
      btnTitle="다음"
      title="휴대폰번호 인증"
      closeBtnOn
    >
      <Stack justifyContent="center" width={'720px'} alignItems="center">
        <Box height="30px" />
        <Stack width="387px">
          {/* 휴대폰입력 */}
          <TermsGrid sx={{ alignItems: 'flex-start' }}>
            <Box sx={{ width: '257px' }}>
              <WTextField
                value={mobileValue}
                onChange={mobileOnChange}
                placeholder={'휴대폰번호를 입력'}
                helper="숫자 11자리를 입력해 주세요."
                error={mobileError}
                disabled={mobileDisabled}
              />
            </Box>
            <Box sx={{ width: '120px', height: '48px' }}>
              <AuthButton
                disabled={mobileValue.length >= 12 ? mobileDisabled : true}
                onClick={onClickAuthNumSend}
              >
                인증번호 발송
              </AuthButton>
            </Box>
          </TermsGrid>
          {/*  인증번호 */}
          <WTextField
            error={authError}
            value={authValue}
            onChange={authOnChange}
            disabled={authDisabled}
            placeholder={'인증번호'}
            helper="숫자만 입력해주세요"
            focusOutEvent={focusOutEvent}
          />
          <Grid container justifyContent={'flex-end'}>
            <Box sx={{ height: '20px' }}>
              {!authDisabled ? (
                <AuthTimer time={3} action={timerActice} resend={timerResend} />
              ) : (
                ''
              )}
            </Box>
          </Grid>
          <Box sx={{ height: '100px' }} />
        </Stack>
      </Stack>
    </WAlert>
  );
};

export default AuthMobileView;
