import { ModalType } from '@components/common/layouts/gnb/types';
import WConfirm from '@components/common/modals/WConfirm';
import { Stack, Typography } from '@mui/material';
import processStatus from 'public/assets/icon/processStatus.svg';
import Image from 'next/image';
import useMutateDeliveryRequest from '@hooks/apis/preparation/history/hooks/useMutateDeliveryRequest';

interface DeliveryRequestModalType extends ModalType {
  id: string;
  mode: 'sameDay' | 'delivery' | '';
}

const DeliveryRequestModal = (props: DeliveryRequestModalType) => {
  const { open, handleClose, id, mode } = props;
  // const { onClickDeliveryRequest } = useMutateDeliveryRequest({ id });
  return (
    <WConfirm
      activeOn
      open={open}
      title={mode === 'delivery' ? '택배 배송 요청' : '당일 배송 요청'}
      maxWidth="sm"
      titleSx={{ padding: '50px 0 28px' }}
      btnTitle={mode === 'delivery' ? '택배 수거 요청' : '지금 기사 호출'}
      handleClose={handleClose}
      // handleEvent={ mode === 'delivery' ? onClickDeliveryRequest : onClicksameDayRequest}
    >
      <Stack gap="16px" padding="0px 0 37px" width="420px">
        <Image src={processStatus} alt="상태" />
        {mode === 'delivery' ? (
          <>
            <Typography
              variant="h6"
              textAlign="center"
              fontWeight="600"
              marginTop={'10px'}
            >
              해당 조제약은 택배 배송입니다.
            </Typography>
            <Stack alignItems="center">
              <Typography variant="subtitle1" color="#666" fontWeight="400">
                {`택배 기사 호출을 원하시면 "택배 수거 요청" 버튼을 `}
              </Typography>
              <Typography variant="subtitle1" color="#666" fontWeight="400">
                {`눌러 주세요. 버튼을 누르면 운송장이 출력됩니다. `}
              </Typography>
              <Typography variant="subtitle1" color="#666" fontWeight="600">
                {`의약품 신청자 이름을 확인 후 운송장을
              부착해 주세요. `}
              </Typography>
            </Stack>
          </>
        ) : mode === 'sameDay' ? (
          <>
            <Typography
              variant="h6"
              textAlign="center"
              fontWeight="600"
              marginTop={'10px'}
            >
              해당 조제약은 당일 배송입니다.
            </Typography>
            <Stack alignItems="center">
              <Typography variant="subtitle1" color="#666" fontWeight="400">
                {`즉시 기사 호출을 원하시면 "지금 기사 호출" 버튼을 `}
              </Typography>
              <Typography variant="subtitle1" color="#666" fontWeight="400">
                {` 눌러 주세요. 기사 배정 시 알림이 발송됩니다. `}
              </Typography>
              <Typography variant="subtitle1" color="#666" fontWeight="600">
                {`의약품 신청자 이름을 약 포장지에 작성해 주세요. `}
              </Typography>
            </Stack>
          </>
        ) : (
          <></>
        )}
      </Stack>
    </WConfirm>
  );
};

export default DeliveryRequestModal;