import React, { useCallback, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { ProceedInterface } from '../type';
import WDataTable, { baseOption } from '@components/common/dataGrid/WDataTable';
import GridButton from '@components/common/button/modules/GridButton';
import {
  CheckIcon,
  UserIcon,
  CheckIconGray,
  PencilIcon,
} from '@components/common/dataDisplay/WIcons';
import RequesterModal from '@components/preparation/modals/RequesterModal';
import { transDeliveryMethod, transMedicineStatus } from '@utils/transtext';
import WDayTimeTypography from '@components/common/typography/WDayTimeTypography';
import { ReceiveData } from '@components/preparation/request/modules/RequestTable';
import PrescriptionPreviewModal from '@components/preparation/modals/PrescriptionPreviewModal';

export interface PrescriptionId {
  prescriptionUlid: string;
  medicineOrderUlid: string;
}

const ProceedTable = (props: { data: ProceedInterface[] }): JSX.Element => {
  const { data } = props;
  const [receiveData, setReceiveData] = useState<ReceiveData>();
  const [requesterOpen, setRequesterOpen] = useState<boolean>(false);
  const [prescriptionOpen, setPrescriptionOpen] = useState<boolean>(false);
  const [completedOpen, setCompletedOpen] = useState<boolean>(false);
  const [dispensingExpensesOpen, setDispensingExpensesOpen] =
    useState<boolean>(false);
  const [userUlid, setUserUlid] = useState<PrescriptionId>({
    prescriptionUlid: '',
    medicineOrderUlid: '',
  });

  const rows = data.map((item, index) => {
    return { ...item, ['id']: index };
  });

  /**ProceedTable 요청자 정보 */
  const requesterOnOff = useCallback((open: boolean, data?: ReceiveData) => {
    setReceiveData(data);
    setRequesterOpen(open);
  }, []);

  /**ProceedTable 처방전 보기 */
  const userUlidOnOff = useCallback(
    (prescriptionUlid: string, medicineOrderUlid: string, open: boolean) => {
      setUserUlid({ prescriptionUlid, medicineOrderUlid });
      setPrescriptionOpen(open);
    },
    [],
  );
  /**ProceedTable 조제비 수정 */
  const dispensingExpensesOnOff = useCallback(
    (medicineOrderUlid: string, open: boolean) => {
      setUserUlid({ prescriptionUlid: '', medicineOrderUlid });
      setDispensingExpensesOpen(open);
    },
    [],
  );
  /**ProceedTable 조제 완료  */
  const completedOnOff = useCallback(
    (medicineOrderUlid: string, open: boolean) => {
      setUserUlid({ prescriptionUlid: '', medicineOrderUlid });
      setCompletedOpen(open);
    },
    [],
  );

  const columns: GridColDef[] = [
    {
      ...baseOption,
      field: 'medicineStatus',
      headerName: '상태',
      width: 80,
      renderCell: (params) => {
        return <>{transMedicineStatus(params.row.medicineStatus)}</>;
      },
    },
    {
      ...baseOption,
      field: 'requestDateTime',
      headerName: '조제 수락 시간',
      width: 135,
      renderCell: (params) => {
        return <WDayTimeTypography date={params.row.requestDateTime} />;
      },
    },
    {
      ...baseOption,
      field: 'deliveryMethod',
      headerName: '수령 방법',
      width: 80,
      renderCell: (params) => {
        return <>{transDeliveryMethod(params.row.deliveryMethod)}</>;
      },
    },

    {
      ...baseOption,
      field: 'requesterInfo',
      headerName: '요청자 정보',
      width: 130,
      renderCell: (prams) => {
        const { deliveryMethod, medicineStatus, receiveData } = prams.row;
        return (
          <GridButton
            onClick={() => {
              requesterOnOff(true, receiveData);
            }}
            startIcon={<UserIcon />}
            disabled={
              medicineStatus === 'CANCEL'
                ? true
                : deliveryMethod === 'COMPLETION'
                ? true
                : false
            }
          >
            요청자 정보
          </GridButton>
        );
      },
    },
    {
      ...baseOption,
      field: 'hospitalNameKo',
      headerName: '진료 병원 명',
      width: 180,
    },
    {
      ...baseOption,
      field: 'doctorNameKo',
      headerName: '진료 병원 의사 명',
      width: 110,
    },
    {
      ...baseOption,
      field: 'hospitalPhoneNum',
      headerName: '병원 연락처',
      width: 105,
    },
    {
      ...baseOption,
      field: 'prescriptionPreview',
      headerName: '처방전 보기',
      width: 125,
      renderCell: (prams) => {
        const { prescriptionUlid, medicineOrderUlid } = prams.row;
        return (
          <GridButton
            onClick={() =>
              userUlidOnOff(prescriptionUlid, medicineOrderUlid, true)
            }
            startIcon={<CheckIcon />}
          >
            처방전 보기
          </GridButton>
        );
      },
    },
    {
      ...baseOption,
      field: 'billingExpenses',
      headerName: '청구 조제비',
      width: 125,
      renderCell: (prams) => {
        const { medicineOrderUlid } = prams.row;
        return (
          <GridButton
            onClick={() => dispensingExpensesOnOff(medicineOrderUlid, true)}
            startIcon={<PencilIcon />}
          >
            조제비 수정
          </GridButton>
        );
      },
    },
    {
      ...baseOption,
      field: 'preparationCompleted',
      headerName: '조제 완료',
      width: 125,
      renderCell: (prams) => {
        const { medicineOrderUlid, medicineStatus } = prams.row;
        return (
          <GridButton
            onClick={() => completedOnOff(medicineOrderUlid, true)}
            startIcon={<CheckIconGray />}
            disabled={medicineStatus === 'OUTSTANDING' ? true : false}
          >
            조제 완료
          </GridButton>
        );
      },
    },
  ];

  return (
    <>
      <WDataTable rows={rows} columns={columns} />
      {/* 요청자 정보 */}
      {/* 요청자 정보 */}
      {receiveData ? (
        <RequesterModal
          receiveData={receiveData}
          open={requesterOpen}
          handleClose={() => requesterOnOff(false, undefined)}
        />
      ) : (
        ''
      )}
      <PrescriptionPreviewModal
        prescriptionUlid={userUlid.prescriptionUlid}
        medicineOrderUlid={userUlid.medicineOrderUlid}
        open={prescriptionOpen}
        handleClose={() => userUlidOnOff('', '', false)}
      />
      {/* 조제비 수정 */}
      {/* {dispensingExpensesId ? (
        <DispensingExpensesModal
          id={dispensingExpensesId}
          open={dispensingExpensesOpen}
          handleClose={() => dispensingExpensesOnOff('', false)}
        />
      ) : (
        ''
      )} */}
      {/* 조제비 수정 */}
      {/* {completedId ? (
        <DispensingModal
          id={completedId}
          open={completedOpen}
          handleClose={() => completedOnOff('', false)}
        />
      ) : (
        ''
      )} */}
    </>
  );
};

export default ProceedTable;
