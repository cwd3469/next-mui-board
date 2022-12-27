import React from 'react';
import WConfirmModal from '@components/common/modals/WConfirm';
import { Stack, Typography } from '@mui/material';
import { GnbMobalType } from './types';
import { WLayout } from '../WLayout';

const GnbModal = (props: GnbMobalType) => {
  const { open, handleClose, timer, resend } = props;
  return (
    <WConfirmModal
      open={open}
      handleClose={handleClose}
      btnTitle="로그인 연장"
      handleEvent={resend}
    >
      <WLayout sx={{ padding: '24px 0px 32px' }}>
        <Stack>
          <Typography
            fontSize={'24px'}
            fontWeight={'normal'}
            textAlign={'center'}
            paddingBottom="8px"
          >
            자동 로그아웃 안내
          </Typography>
          <Typography
            fontSize={'24px'}
            fontWeight={'normal'}
            textAlign={'center'}
            paddingBottom="8px"
          >
            {timer}
          </Typography>
          <>
            <Stack gap="20px" padding="24px 0px">
              <Typography
                color="#4A4A4A"
                textAlign={'center'}
                fontSize="16px"
                fontWeight="700"
              >
                자동 로그아웃 안내
              </Typography>
              <Stack gap="5px">
                <Typography color="#4A4A4A" textAlign="center">
                  영업일 기준 2~3일 이내 제휴 담당자가 순차적으로 연락드립니다.
                </Typography>
                <Typography color="#4A4A4A" textAlign="center">
                  가입 승인 이후 서비스 이용이 가능합니다.
                </Typography>
              </Stack>
            </Stack>
          </>
        </Stack>
      </WLayout>
    </WConfirmModal>
  );
};

GnbModal.defaultProps = {
  type: 'signin',
};

export default GnbModal;
