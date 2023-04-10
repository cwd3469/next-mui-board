import { ModalType } from '@components/common/layouts/gnb/types';
import WConfirm from '@components/common/modals/WConfirm';
import { Stack, Typography } from '@mui/material';
import processStatus from 'public/assets/icon/processStatus.svg';
import Image from 'next/image';
import useMutateDispensingExpenses from '@hooks/apis/preparation/proceed/hooks/useMutateDispensingExpenses';
import { useDebounceFn, useKeyPress } from 'ahooks';
import DeliveryRequestModal, { DeliveryState } from './DeliveryRequestModal';
import { useCallback, useState } from 'react';
import FailedChangeModal from './FailedChangeModal';

interface DispensingModalType extends ModalType {
  id: string;
  mode?: 'history' | 'proceed';
}

const DispensingModal = (props: DispensingModalType) => {
  const { open, handleClose, id, mode } = props;
  /**DispensingModal 당일배송 요청 모달 상태*/
  const [deliveryOpen, setDeliveryOpen] = useState<boolean>(false);
  const [errorOpen, setErrorOpen] = useState<boolean>(false);
  const [bgOpen, setBgOpen] = useState<boolean>(false);

  /**DispensingModal 조제 완료 모달 초기화*/
  const onClickReset = useCallback(() => {
    setDeliveryOpen(false);
    setErrorOpen(false);
    setBgOpen(false);
    handleClose();
  }, [handleClose]);

  /**DispensingModal 조제 완료 모달 onError*/
  const onClickOnError = useCallback(() => {
    setErrorOpen(true);
    setBgOpen(true);
  }, []);

  /**DispensingModal 조제 완료 모달 onSuccess*/
  const onClickOnSuccess = useCallback(() => {
    setDeliveryOpen(true);
    setBgOpen(true);
  }, []);

  /**ProceedTable 조제 완료 api 통신 */
  const { onClickQuickPayment } = useMutateDispensingExpenses({
    medicineOrderUlid: id,
    quickPayment: {
      onError: onClickOnError,
      onSuccess: onClickOnSuccess,
    },
  });
  /**ProceedTable 조제 완료 api 통신 useDebounceFn*/
  const onClickQuickPaymentDebounce = useDebounceFn(onClickQuickPayment, {
    wait: 300,
  });

  useKeyPress('enter', () => {
    onClickQuickPaymentDebounce.run();
  });

  return (
    <WConfirm
      activeOn
      open={open}
      title={
        mode === 'history'
          ? '완료된 조제건 배송 요청 안내'
          : '배송 요청 전 복약지도 안내'
      }
      maxWidth="sm"
      titleSx={{ padding: '50px 0 60px' }}
      btnTitle={'배송 요청'}
      handleClose={onClickReset}
      bgDisable={bgOpen}
      handleEvent={onClickQuickPaymentDebounce.run}
    >
      <Stack gap="16px" padding="0px 0 85px" width="420px">
        <Image src={processStatus} alt="상태" />
        <>
          <Stack alignItems="center">
            <Typography variant="h5" color="#666" fontWeight="400">
              {mode === 'history'
                ? '완료된 조제건에 대해'
                : `환자에게 유선 및 서면을 통한 `}
            </Typography>
            <Typography variant="h5" color="#666" fontWeight="400">
              {mode === 'history'
                ? '사용자에게 배송 요청을 해주세요.'
                : `복약지도 꼭! 부탁드립니다. `}
            </Typography>
          </Stack>
        </>
        <FailedChangeModal
          open={errorOpen}
          handleClose={() => {
            setErrorOpen(false);
            setBgOpen(false);
          }}
        />
        <DeliveryRequestModal
          mode={'QUICK'}
          id={id}
          open={deliveryOpen}
          handleClose={onClickReset}
        />
      </Stack>
    </WConfirm>
  );
};

export default DispensingModal;
