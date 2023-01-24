import { ModalType } from '@components/common/layouts/gnb/types';
import WConfirm from '@components/common/modals/WConfirm';
import { Stack, Typography } from '@mui/material';
import processStatus from 'public/assets/icon/processStatus.svg';
import Image from 'next/image';
import useMutateDeliveryRequest from '@hooks/apis/preparation/history/hooks/useMutateDeliveryRequest';

interface DispensingModalType extends ModalType {
  id: string;
}

const DispensingModal = (props: DispensingModalType) => {
  const { open, handleClose, id } = props;
  // const { onClickDeliveryRequest } = useMutateDeliveryRequest({ id });
  return (
    <WConfirm
      activeOn
      open={open}
      title={'배송 요청 전 복약지도 안내'}
      maxWidth="sm"
      titleSx={{ padding: '50px 0 60px' }}
      btnTitle={'배송 요청'}
      handleClose={handleClose}
      // handleEvent={ mode === 'delivery' ? onClickDeliveryRequest : onClicksameDayRequest}
    >
      <Stack gap="16px" padding="0px 0 85px" width="420px">
        <Image src={processStatus} alt="상태" />
        <>
          <Stack alignItems="center">
            <Typography variant="h5" color="#666" fontWeight="400">
              {`환자에게 유선 및 서면을 통한 `}
            </Typography>
            <Typography variant="h5" color="#666" fontWeight="400">
              {`복약지도 꼭! 부탁드립니다. `}
            </Typography>
          </Stack>
        </>
      </Stack>
    </WConfirm>
  );
};

export default DispensingModal;
