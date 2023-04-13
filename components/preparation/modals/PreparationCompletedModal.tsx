import { ModalType } from '@components/common/layouts/gnb/types';
import WConfirm from '@components/common/modals/WConfirm';
import useMutateDispensingExpenses from '@hooks/apis/preparation/proceed/hooks/useMutateDispensingExpenses';
import { Stack, Typography } from '@mui/material';
import { useDebounceFn } from 'ahooks';
import FailedChangeModal from './FailedChangeModal';
import { useState } from 'react';

interface PreparationCompletedModalType extends ModalType {
  medicineOrderUlid?: string;
}

const PreparationCompletedModal = (props: PreparationCompletedModalType) => {
  const { open, handleClose, medicineOrderUlid } = props;
  const [failedOpen, setFailedOpen] = useState<boolean>(false);
  /**PreparationCompletedModal 조제 완료 api 통신 */
  const { onClickPreparationComplete } = useMutateDispensingExpenses({
    medicineOrderUlid: medicineOrderUlid ? medicineOrderUlid : '',
    completeCoast: {
      onSuccess: handleClose,
      onError: () => setFailedOpen(true),
    },
  });
  /**PreparationCompletedModal 조제 완료 api 통신 useDebounceFn*/
  const onClickCompleteDebounce = useDebounceFn(onClickPreparationComplete, {
    wait: 300,
  });

  return (
    <WConfirm
      open={open}
      handleClose={handleClose}
      title="조제 완료 상태 변경"
      maxWidth="sm"
      btnTitle="조제 완료"
      titleSx={{ padding: '50px 0px 60px' }}
      handleEvent={onClickCompleteDebounce.run}
      bgDisable={failedOpen}
      activeOn
    >
      <Stack alignItems="center" paddingBottom="68px" gap="20px">
        <Typography
          variant="h5"
          color="#666"
          fontWeight="400"
          textAlign="center"
          sx={{ wordBreak: 'keep-all' }}
        >
          {`해당 조제 내용을 조제 완료로 상태를 변경하시겠습니까?. `}
        </Typography>
        <Typography
          variant="h5"
          color="#666"
          fontWeight="400"
          textAlign="center"
          sx={{ wordBreak: 'keep-all' }}
        >
          {`완료된 조제 내용은 조제 내역 페이지에서 확인이 가능합니다.`}
        </Typography>
        <FailedChangeModal
          open={failedOpen}
          handleClose={() => setFailedOpen(false)}
        />
      </Stack>
    </WConfirm>
  );
};

export default PreparationCompletedModal;
