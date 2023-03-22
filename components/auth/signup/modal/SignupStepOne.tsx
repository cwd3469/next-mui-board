import { TermsButton, TermsCheckBox, TermsGrid } from '../styled';
import { ModalType } from '@components/common/layouts/gnb/types';
import WAlert from '@components/common/modals/WAlert';
import WSubTitle from '@components/common/typography/WSubTitle';
import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import useTerms from '../../hooks/useTerms';
import SignupTerms from './SignupTerms';
import SignupStepTwo from './SignupStepTwo';
import { makeStyles } from '@mui/styles';
import { useDebounceFn } from 'ahooks';
import PartnerAgree from '@components/auth/terms/PartnerAgree';
import PrivacyAgree from '@components/auth/terms/PrivacyAgree';
import PrivacyPolicy from '@components/auth/terms/PrivacyPolicy';

const useStyles = makeStyles((theme) => ({
  subTitle: {
    '& .wSubTitle-title': { fontWeight: '400', color: '#333' },
    '& .wSubTitle-require': { fontSize: '18px' },
  },
  allInAgree: {
    '& .wSubTitle-title': {
      fontSize: '20px',
    },
  },
}));

const SignupStepOne = (props: ModalType) => {
  const termHook = useTerms();
  const classes = useStyles();
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [partnerAgreeOn, setPartnerAgreeOn] = useState<boolean>(false);
  const [privacyAgreeOn, setPrivacyAgreeOn] = useState<boolean>(false);
  const [privacyPolicyOn, setPrivacyPolicyOn] = useState<boolean>(false);
  const [bgDisable, setBgDisable] = useState<boolean>(false);

  /** SignupStepOne off 기능*/
  const onCloseModal = () => {
    termHook.onClickReset();
    props.handleClose();
    setBgDisable(false);
    setPrivacyAgreeOn(false);
    setPrivacyPolicyOn(false);
    setPartnerAgreeOn(false);
    setModalOn(false);
  };
  /**SignupStepOne 약관 모달 on 기능 */
  const onTermsPartnerAgree = () => {
    setPartnerAgreeOn(true);
    setBgDisable(true);
  };
  /**SignupStepOne 약관 모달 on 기능 */
  const onTermsPrivacyAgree = () => {
    setPrivacyAgreeOn(true);
    setBgDisable(true);
  };
  /**SignupStepOne 약관 모달 on 기능 */
  const onTermsPrivacyPolicy = () => {
    setPrivacyPolicyOn(true);
    setBgDisable(true);
  };
  /** SignupStepOne 약관 모달 off 기능*/
  const onCloseTerms = () => {
    setPrivacyAgreeOn(false);
    setPrivacyPolicyOn(false);
    setPartnerAgreeOn(false);
    setBgDisable(false);
  };
  const handleEvent = useDebounceFn(
    () => {
      setModalOn(true);
      setBgDisable(true);
    },
    {
      wait: 300,
    },
  );

  return (
    <WAlert
      open={props.open}
      handleClose={onCloseModal}
      handleEvent={handleEvent.run}
      disabled={termHook.disabled}
      bgDisable={bgDisable}
      maxWidth="xl"
      activeOn
      btnTitle="다음"
      title="가입 안내"
      closeBtnOn
    >
      <Stack sx={{ width: '720px', padding: '0px 40px' }}>
        <Typography variant="subtitle1" fontWeight={'400'}>
          어디 아파에 오신 약국 사용자님 반갑습니다.
        </Typography>
        <Box height="10px" />
        <Typography variant="h5">안전한 서비스 사용을 위해</Typography>
        <Typography variant="h5">
          서비스 약관 정보 제공 동의를 해주세요.
        </Typography>
        <Box paddingTop={'40px'} />
        <Stack border="1px solid #ebeced">
          <TermsGrid padding={'24px 24px'} borderBottom="1px solid #ebeced">
            <TermsGrid gap="16px">
              <TermsCheckBox
                checked={termHook.agreeAll}
                onChange={termHook.onCheckAllAgree}
              />
              <WSubTitle
                title="전체 동의 하기"
                className={`${classes.allInAgree} ${classes.subTitle}`}
                onClick={termHook.onCheckAllAgree}
              />
            </TermsGrid>
          </TermsGrid>
          <TermsGrid padding={'24px 24px'}>
            <TermsGrid gap="16px">
              <TermsCheckBox
                checked={termHook.agreeTermA}
                onChange={() => termHook.onCheckBoxA(termHook.agreeTermA)}
              />
              <WSubTitle
                title="개인정보 보호 의무 동의"
                className={classes.subTitle}
                onClick={() => termHook.onCheckBoxA(termHook.agreeTermA)}
                require
              />
            </TermsGrid>
            <TermsButton onClick={onTermsPrivacyAgree}>전문보기</TermsButton>
          </TermsGrid>
          <TermsGrid padding={'24px 24px'}>
            <TermsGrid gap="16px">
              <TermsCheckBox
                checked={termHook.agreeTermB}
                onChange={() => termHook.onCheckBoxB(termHook.agreeTermB)}
              />
              <WSubTitle
                title="개인정보 처리 동의서"
                className={classes.subTitle}
                onClick={() => termHook.onCheckBoxB(termHook.agreeTermB)}
                require
              />
            </TermsGrid>
            <TermsButton onClick={onTermsPrivacyPolicy}>전문보기</TermsButton>
          </TermsGrid>
          <TermsGrid padding={'24px 24px'}>
            <TermsGrid gap="16px">
              <TermsCheckBox
                checked={termHook.agreeTermC}
                onChange={() => termHook.onCheckBoxC(termHook.agreeTermC)}
              />
              <WSubTitle
                title="파트너사 이용약관"
                className={classes.subTitle}
                require
                onClick={() => termHook.onCheckBoxC(termHook.agreeTermC)}
              />
            </TermsGrid>
            <TermsButton onClick={onTermsPartnerAgree}>전문보기</TermsButton>
          </TermsGrid>
        </Stack>
        <Box height="100px" />
        {/* 파트너사 이용약관을 조회 */}
        {partnerAgreeOn ? (
          <SignupTerms
            open={partnerAgreeOn}
            handleClose={onCloseTerms}
            html={<PartnerAgree />}
          />
        ) : (
          ''
        )}
        {/* 개인정보 처리에 관한 동의서를 조회 */}
        {privacyAgreeOn ? (
          <SignupTerms
            open={privacyAgreeOn}
            handleClose={onCloseTerms}
            html={<PrivacyAgree />}
          />
        ) : (
          ''
        )}
        {/* 파트너 개인정보 보호 의무 동의를 조회 */}
        {privacyPolicyOn ? (
          <SignupTerms
            open={privacyPolicyOn}
            handleClose={onCloseTerms}
            html={<PrivacyPolicy />}
          />
        ) : (
          ''
        )}
        <SignupStepTwo open={modalOn} handleClose={onCloseModal} />
      </Stack>
    </WAlert>
  );
};

export default SignupStepOne;
