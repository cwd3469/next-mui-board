import { ModalType } from '@components/common/layouts/gnb/types';
import WConfirm from '@components/common/modals/WConfirm';
import { apiProceedPrescription } from '@hooks/apis/preparation/proceed';
import usePrescriptionPreview, {
  OneImagePreviewComponent,
} from '@hooks/utils/fileUpload/usePrescriptionPreview';
import { useCallback } from 'react';

interface PrescriptionModalType extends ModalType {
  medicineOrderUlid: string;
  prescriptionUlid: string;
}

const PrescriptionPreviewModal = (props: PrescriptionModalType) => {
  const { open, handleClose, medicineOrderUlid, prescriptionUlid } = props;

  /**PrescriptionPreviewModal 처방전 미리보기 기능 */
  const { fileArr, imageUrl, reset } = usePrescriptionPreview({
    medicineOrderUlid: medicineOrderUlid,
    prescriptionUlid: prescriptionUlid,
    handleClose: handleClose,
    apiFileBase: apiProceedPrescription,
  });

  /**DispensingAccepModal 처방전 미리보기 기능 */
  const onReset = useCallback(() => {
    handleClose();
    reset();
  }, [handleClose, reset]);

  /**DispensingAccepModal render */
  return (
    <WConfirm
      open={open}
      handleClose={onReset}
      title="처방전 보기"
      maxWidth="xl"
      titleSx={{ padding: '50px 0px 16px' }}
      btnTitle="인쇄하기"
      activeOn
    >
      <OneImagePreviewComponent fileArr={fileArr} imageUrl={imageUrl} />
    </WConfirm>
  );
};

export default PrescriptionPreviewModal;
