import WTwoTab from '@components/common/button/radio/modules/WTwoTab';
import WPdfView from '@components/common/editor/WPdfView';
import WPaymentsTextField from '@components/common/inputs/textField/modules/WPaymentsTextField';
import WRefusalDispenTextField from '@components/common/inputs/textField/modules/WRefusalDispenTextField';
import { ErrorType } from '@components/common/inputs/type';
import { ModalType } from '@components/common/layouts/gnb/types';
import WConfirm from '@components/common/modals/WConfirm';
import WSubTitle from '@components/common/typography/WSubTitle';
import useMutateDispensingAccept from '@hooks/apis/preparation/request/hooks/useMutateDispensingAccept';
import usePrescriptionPreview from '@hooks/utils/fileUpload/usePrescriptionPreview';
import { Box, Grid, Stack } from '@mui/material';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

interface DispensingAccepModalType extends ModalType {
  medicineOrderUlid: string;
  prescriptionUlid: string;
}

interface Paymentsinfo {
  payment: string;
  refusal: string;
}
interface PaymentsinfoErr {
  payment: ErrorType;
  refusal: ErrorType;
}

const DispensingAccepModal = (props: DispensingAccepModalType) => {
  const { open, handleClose, medicineOrderUlid, prescriptionUlid } = props;
  const { fileArr, imageUrl, reset } = usePrescriptionPreview({
    medicineOrderUlid: medicineOrderUlid,
    prescriptionUlid: prescriptionUlid,
    handleClose: handleClose,
  });
  const onClickReset = useCallback(() => {
    handleClose();
    reset();
  }, [handleClose, reset]);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [tab, setTab] = useState<boolean>(true);
  const [info, setInfo] = useState<Paymentsinfo>({
    payment: '',
    refusal: '',
  });
  const [infoErr, setInfoErr] = useState<PaymentsinfoErr>({
    payment: { msg: '', boo: false },
    refusal: { msg: '', boo: false },
  });
  const { onClickDispensingAccept, onClickMutateDispensingRefuse } =
    useMutateDispensingAccept({
      dispensingExpenses: info.payment,
      refuseReason: info.refusal,
      medicineOrderUlid: medicineOrderUlid,
      onSuccess: onClickReset,
      onError: onClickReset,
    });

  const onChangeState = useCallback((text: string, keyId: string) => {
    setInfo((prev) => {
      return { ...prev, [keyId]: text };
    });
  }, []);
  const onChangeStateErr = useCallback((err: ErrorType, keyId: string) => {
    setInfoErr((prev) => {
      return { ...prev, [keyId]: err };
    });
  }, []);

  const acceptInvigorator = useCallback(() => {
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

  const refusalInvigorator = useCallback(() => {
    if (info.refusal) {
      if (!infoErr.refusal.boo) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      setDisabled(true);
    }
  }, [info.refusal, infoErr.refusal.boo]);

  const onTab = useCallback(() => {
    setTab(!tab);
    setInfo({ payment: '', refusal: '' });
    setInfoErr({
      payment: { msg: '', boo: false },
      refusal: { msg: '', boo: false },
    });
  }, [tab]);

  useEffect(() => {
    if (tab) {
      acceptInvigorator();
    } else {
      refusalInvigorator();
    }
  }, [acceptInvigorator, refusalInvigorator, tab]);

  return (
    <WConfirm
      open={open}
      handleClose={onClickReset}
      handleEvent={
        tab
          ? () => {
              return;
            }
          : onClickMutateDispensingRefuse
      }
      title="조제 수락 / 거절"
      maxWidth={tab ? 'xl' : 'sm'}
      titleSx={{ padding: '50px 0px 16px' }}
      btnTitle={tab ? '조제 수락' : '조제 거절'}
      disabled={disabled}
      activeOn
    >
      <Stack gap="16px">
        <WTwoTab tab={tab} setTab={onTab} />
        {tab ? (
          <>
            {fileArr.length ? (
              <Stack gap="32px" padding="0px 40px">
                <Box sx={{ height: '900px', position: 'relative' }}>
                  <Stack justifyContent={'center'} alignItems="center">
                    {fileArr[0].type === 'application/pdf' ? (
                      <Box
                        width="595px"
                        height="842px"
                        sx={{
                          overflowY: 'scroll',
                        }}
                      >
                        <WPdfView pdf={fileArr[0]} />
                      </Box>
                    ) : (
                      <Box
                        width="595px"
                        height="842px"
                        position="relative"
                        sx={{
                          overflowY: 'scroll',
                        }}
                      >
                        <Box
                          width="580px"
                          height="auto"
                          minHeight={'800px'}
                          position="relative"
                        >
                          <Image
                            src={imageUrl[0]?.url}
                            alt="처방전"
                            layout="fill"
                            objectFit="contain"
                          />
                        </Box>
                      </Box>
                    )}
                    <Box
                      width="420px"
                      borderBottom="2px solid #ebeced"
                      margin="32px 0px 48px"
                    />
                  </Stack>
                </Box>
                <Grid container justifyContent="center">
                  <Stack gap="14px" width="420px">
                    <WSubTitle title="조제비 입력" require />
                    <WPaymentsTextField
                      state={info.payment}
                      setState={onChangeState}
                      keyId={'payment'}
                      err={infoErr.payment}
                      setErr={onChangeStateErr}
                    />
                  </Stack>
                </Grid>
              </Stack>
            ) : (
              <Stack height="500px"></Stack>
            )}
          </>
        ) : (
          <Stack gap="14px">
            <WSubTitle title="조제 거절 사유 입력" require />
            <WRefusalDispenTextField
              state={info.refusal}
              setState={onChangeState}
              keyId={'refusal'}
              err={infoErr.refusal}
              setErr={onChangeStateErr}
            />
          </Stack>
        )}

        <Box height="58px" />
      </Stack>
    </WConfirm>
  );
};

export default DispensingAccepModal;
