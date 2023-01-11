import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { ItemInput } from '../styled';
import { SignupStepThreeType } from '../type';
import WAlert from '@components/common/modals/WAlert';
import SignupFileUpload from '@components/common/inputs/fileUpload/SignupFileUpload';
import WAddressSearch from '@components/common/inputs/WAddressSearch';
import {
  WAddressDetailTextField,
  WAdminNameTextField,
  WBusinessNumTextField,
  WFaxTextField,
  WPharmcyNameTextField,
  WPhoneTextField,
  WPwTextField,
  WRepwTextField,
  WUseridTextField,
} from '@components/common/inputs/textField/modules';
import useSignup from '@components/auth/hooks/useSignup';
import { useCallback } from 'react';

const SignupStepThree = (props: SignupStepThreeType) => {
  const {
    signInfoDto,
    formChanger,
    btnDisable,
    infoErr,
    modalOn,
    info,
    open,
    addressOnChange,
    handleCloseAll,
    setInInfoErr,
    setInInfo,
  } = useSignup(props);

  const onClickSignup = useCallback(() => {
    console.log(signInfoDto);
  }, [signInfoDto]);

  return (
    <WAlert
      open={open}
      handleClose={handleCloseAll}
      maxWidth={'xl'}
      btnTitle="다음"
      handleEvent={onClickSignup}
      disabled={btnDisable}
      activeOn
      closeBtnOn
      title="병원 정보 입력"
    >
      <Stack>
        <Grid container justifyContent={'space-between'}>
          <Stack width="320px" gap="8px">
            <ItemInput title="아이디" require>
              <WUseridTextField
                state={info.id}
                err={infoErr.idErr}
                setState={setInInfo}
                setErr={setInInfoErr}
                keyId={'id'}
              />
            </ItemInput>
            <ItemInput title="비밀번호" require>
              <WPwTextField
                state={info.pw}
                err={infoErr.pwErr}
                setState={setInInfo}
                setErr={setInInfoErr}
                keyId={'pw'}
              />
            </ItemInput>
            <ItemInput title="비밀번호 확인" require>
              <WRepwTextField
                pw={info.pw}
                state={info.rePw}
                err={infoErr.rePwErr}
                setState={setInInfo}
                setErr={setInInfoErr}
                keyId={'rePw'}
              />
            </ItemInput>
            <ItemInput title="담당자 이름" require>
              <WAdminNameTextField
                state={info.name}
                err={infoErr.nameErr}
                setState={setInInfo}
                setErr={setInInfoErr}
                keyId={'name'}
              />
            </ItemInput>
            <ItemInput title="담당자 휴대폰 번호">
              <Box padding="14px 0">
                <Typography>{formChanger}</Typography>
              </Box>
            </ItemInput>
          </Stack>
          <Stack width="320px" gap="8px">
            <ItemInput title="약국명" require>
              <WPharmcyNameTextField
                state={info.pharmacyName}
                err={infoErr.pharmacyNameErr}
                setState={setInInfo}
                setErr={setInInfoErr}
                keyId={'pharmacyName'}
              />
            </ItemInput>
            <ItemInput title="약국 주소" require>
              <WAddressSearch setAddress={addressOnChange} />
            </ItemInput>
            <Box height="20px" />
            <ItemInput title="약국 상세 주소" require>
              <WAddressDetailTextField
                state={info.addressDetail}
                err={infoErr.addressDetailErr}
                setState={setInInfo}
                setErr={setInInfoErr}
                keyId={'addressDetail'}
              />
            </ItemInput>
            <ItemInput title="약국 전화 번호" require>
              <WPhoneTextField
                state={info.pharmacyPhone}
                err={infoErr.pharmacyPhoneErr}
                setState={setInInfo}
                setErr={setInInfoErr}
                keyId={'pharmacyPhone'}
              />
            </ItemInput>
            <ItemInput title="약국 팩스번호" require>
              <WFaxTextField
                state={info.pharmacyTaxNum}
                err={infoErr.pharmacyTaxNumErr}
                setState={setInInfo}
                setErr={setInInfoErr}
                keyId={'pharmacyTaxNum'}
              />
            </ItemInput>
            <ItemInput title="사업자 등록 번호" require>
              <WBusinessNumTextField
                state={info.buisNum}
                err={infoErr.buisNumErr}
                setState={setInInfo}
                setErr={setInInfoErr}
                keyId={'buisNum'}
              />
            </ItemInput>
          </Stack>
        </Grid>
        <Grid container width="740px" justifyContent="space-between">
          <ItemInput
            title="사업자 등록증 첨부"
            require
            sx={{ width: '220px', gap: '0px' }}
          >
            <SignupFileUpload
              name="businessLicense"
              modifyFile={[]}
              onDeleteLogoUid={() => setInInfo('', 'businessLicense')}
              onUploadFile={(uild) =>
                setInInfo(uild.fileUlid, 'businessLicense')
              }
            />
          </ItemInput>
          <ItemInput
            title="약사 면허증 첨부"
            require
            sx={{ width: '220px', gap: '0px' }}
          >
            <SignupFileUpload
              name="pharmacistLicense"
              modifyFile={[]}
              onDeleteLogoUid={() => setInInfo('', 'pharmacistLicense')}
              onUploadFile={(uild) =>
                setInInfo(uild.fileUlid, 'pharmacistLicense')
              }
            />
          </ItemInput>
          <ItemInput
            title="통장사본 첨부"
            require
            sx={{ width: '220px', gap: '0px' }}
          >
            <SignupFileUpload
              name="bankbookCopy"
              modifyFile={[]}
              onDeleteLogoUid={() => setInInfo('', 'bankbookCopy')}
              onUploadFile={(uild) => setInInfo(uild.fileUlid, 'bankbookCopy')}
            />
          </ItemInput>
        </Grid>
      </Stack>
    </WAlert>
  );
};

export default SignupStepThree;
