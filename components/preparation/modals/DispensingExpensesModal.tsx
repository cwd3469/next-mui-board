import { ModalType } from '@components/common/layouts/gnb/types';
import WConfirm from '@components/common/modals/WConfirm';
import { Stack, Typography } from '@mui/material';
import processStatus from 'public/assets/icon/processStatus.svg';
import Image from 'next/image';
import useMutateDeliveryRequest from '@hooks/apis/preparation/history/hooks/useMutateDeliveryRequest';
import WPaymentsTextField from '@components/common/inputs/textField/modules/WPaymentsTextField';
import { useEffect, useState } from 'react';
import { ErrorType } from '@components/common/inputs/type';
import WSubTitle from '@components/common/typography/WSubTitle';
import useMutateDispensingExpenses from '@hooks/apis/preparation/proceed/hooks/useMutateDispensingExpenses';

interface DispensingExpensesModalType extends ModalType {
  id: string;
}

interface Paymentsinfo {
  payment: string;
}
interface PaymentsinfoErr {
  payment: ErrorType;
}

const DispensingExpensesModal = (props: DispensingExpensesModalType) => {
  const { open, handleClose, id } = props;
  const [disabled, setDisabled] = useState<boolean>(true);
  const [info, setInfo] = useState<Paymentsinfo>({
    payment: '',
  });
  const [infoErr, setInfoErr] = useState<PaymentsinfoErr>({
    payment: { msg: '', boo: false },
  });
  const { onClickDispensingExpenses } = useMutateDispensingExpenses({
    medicineCost: info.payment,
    medicineOrderUlid: id,
    onError: handleClose,
    onSuccess: handleClose,
  });

  useEffect(() => {
    if (info.payment) {
      if (!infoErr.payment.boo) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      setDisabled(true);
    }
  }, [info.payment, infoErr.payment.boo]);

  return (
    <WConfirm
      activeOn
      open={open}
      title={'조제비 수정'}
      maxWidth="sm"
      titleSx={{ padding: '50px 0 8px' }}
      btnTitle={'수정'}
      handleClose={handleClose}
      disabled={disabled}
      handleEvent={onClickDispensingExpenses}
    >
      <Stack gap="40px" padding="0px 0 85px" width="430px">
        <Typography variant="body2" color="#666" fontWeight="400">
          {`조제비를 잘못 입력했을 경우 "조제 완료" 전까지 수정이 가능합니다. 변경된 조제비 입력 후 "수정" 버튼을 눌러주세요.`}
        </Typography>
        <Stack gap="14px">
          <WSubTitle title="조제비 입력" require />
          <WPaymentsTextField
            state={info.payment}
            setState={(text: string, keyId: string) => {
              setInfo((prev) => {
                return { ...prev, [keyId]: text };
              });
            }}
            keyId={'payment'}
            err={infoErr.payment}
            setErr={(err: ErrorType, keyId: string) => {
              setInfoErr((prev) => {
                return { ...prev, [keyId]: err };
              });
            }}
          />
        </Stack>
      </Stack>
    </WConfirm>
  );
};

export default DispensingExpensesModal;
