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

interface Paymentsinfo {
  payment: string;
  refusal: string;
}
interface PaymentsinfoErr {
  payment: ErrorType;
  refusal: ErrorType;
}

/**DispensingAccepModal props type */
interface DispensingAccepModalType extends ModalType {
  medicineOrderUlid: string;
  prescriptionUlid: string;
}

const DispensingAccepModal = (props: DispensingAccepModalType) => {
  const { open, handleClose, medicineOrderUlid, prescriptionUlid } = props;

  /**DispensingAccepModal 처방전 미리보기 기능 */
  const { fileArr, imageUrl, reset } = usePrescriptionPreview({
    medicineOrderUlid: medicineOrderUlid,
    prescriptionUlid: prescriptionUlid,
    handleClose: handleClose,
  });

  /**DispensingAccepModal 버튼 활성화 상태 */
  const [disabledAccept, setDisabledAccept] = useState<boolean>(true);

  /**DispensingAccepModal 버튼 활성화 상태 */
  const [disabledRefuse, setDisabledRefuse] = useState<boolean>(true);
  /**DispensingAccepModal 탭 상태 */
  const [tab, setTab] = useState<boolean>(true);
  /**DispensingAccepModal 입력값 상태 */
  const [info, setInfo] = useState<Paymentsinfo>({
    payment: '',
    refusal: '',
  });
  /**DispensingAccepModal 입력값 err 상태 */
  const [infoErr, setInfoErr] = useState<PaymentsinfoErr>({
    payment: { msg: '', boo: false },
    refusal: { msg: '', boo: false },
  });

  /**DispensingAccepModal 모달 닫기 기능 */
  const onClickReset = useCallback(() => {
    handleClose();
    reset();
  }, [handleClose, reset]);

  /**DispensingAccepModal 수락 거절 api 요청 기능 */
  const { onClickDispensingAccept, onClickMutateDispensingRefuse } =
    useMutateDispensingAccept({
      dispensingExpenses: info.payment,
      refuseReason: info.refusal,
      medicineOrderUlid: medicineOrderUlid,
      onSuccess: onClickReset,
      onError: onClickReset,
    });

  /**DispensingAccepModal 입력 상태 변경 기능 */
  const onChangeState = useCallback((text: string, keyId: string) => {
    setInfo((prev) => {
      return { ...prev, [keyId]: text };
    });
  }, []);
  /**DispensingAccepModal 입력 Err 상태 변경 기능 */
  const onChangeStateErr = useCallback((err: ErrorType, keyId: string) => {
    setInfoErr((prev) => {
      return { ...prev, [keyId]: err };
    });
  }, []);
  /**DispensingAccepModal 조제 수락 비활성화 변경 기능 */
  const acceptInvigorator = useCallback(() => {
    if (info.payment) {
      if (!infoErr.payment.boo) {
        setDisabledAccept(false);
      } else {
        setDisabledAccept(true);
      }
    } else {
      setDisabledAccept(true);
    }
  }, [info.payment, infoErr.payment.boo]);

  /**DispensingAccepModal 조제 거절 비활성화 변경 기능 */
  const refusalInvigorator = useCallback(() => {
    if (info.refusal) {
      if (!infoErr.refusal.boo) {
        setDisabledRefuse(false);
      } else {
        setDisabledRefuse(true);
      }
    } else {
      setDisabledRefuse(true);
    }
  }, [info.refusal, infoErr.refusal.boo]);

  /**DispensingAccepModal 조제 수락 비활성화 변경 기능 */
  const onTab = useCallback(() => {
    setTab(!tab);
  }, [tab]);

  useEffect(() => {
    if (tab) {
      acceptInvigorator();
    } else {
      refusalInvigorator();
    }
  }, [acceptInvigorator, refusalInvigorator, tab]);

  /**DispensingAccepModal render */
  return (
    <WConfirm
      open={open}
      handleClose={onClickReset}
      handleEvent={
        tab ? onClickDispensingAccept : onClickMutateDispensingRefuse
      }
      title="조제 수락 / 거절"
      maxWidth={tab ? 'xl' : 'sm'}
      titleSx={{ padding: '50px 0px 16px' }}
      btnTitle={tab ? '조제 수락' : '조제 거절'}
      disabled={tab ? disabledAccept : disabledRefuse}
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
