import WTextField from '@components/common/inputs/textField';
import WAlert from '@components/common/modals/WAlert';
import { Box, Grid, Stack } from '@mui/material';
import { useDebounceFn } from 'ahooks';
import AuthTimer from '../inputs/AuthTimer';
import { AuthButton, TermsGrid } from '../signup/styled';
import { AuthMobileViewType } from '../types';

const AuthMobileView = (props: AuthMobileViewType) => {
  const signupAuthOnClick = useDebounceFn(props.signupAuthOnClick, {
    wait: 300,
  });
  const onClickAuthNumSend = useDebounceFn(props.onClickAuthNumSend, {
    wait: 300,
  });
  return (
    <WAlert
      open={props.open}
      handleClose={props.resetModalClose}
      maxWidth={'xl'}
      handleEvent={signupAuthOnClick.run}
      bgDisable={props.bgDisable}
      disabled={props.numDisabled}
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
                value={props.mobileValue}
                onChange={props.mobileOnChange}
                placeholder={'휴대폰번호'}
                helper="숫자 11자리를 입력해 주세요."
                error={props.mobileError}
                disabled={props.mobileDisabled}
              />
            </Box>
            <Box sx={{ width: '120px', height: '48px' }}>
              <AuthButton
                disabled={
                  props.mobileValue.length >= 12 ? props.btnDisabled : true
                }
                onClick={onClickAuthNumSend.run}
              >
                인증번호 발송
              </AuthButton>
            </Box>
          </TermsGrid>
          {/*  인증번호 */}
          <WTextField
            error={props.authError}
            value={props.authValue}
            onChange={props.authOnChange}
            disabled={props.authDisabled}
            placeholder={'인증번호'}
            helper="숫자만 입력해주세요"
            focusOutEvent={props.focusOutEvent}
          />
          <Grid container justifyContent={'flex-end'}>
            <Box sx={{ height: '20px' }}>
              {!props.authDisabled ? (
                <AuthTimer
                  showTime={{
                    minutes: 2,
                    seconds: 30,
                  }}
                  time={3}
                  action={props.timerActice}
                  resend={props.timerResend}
                />
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
