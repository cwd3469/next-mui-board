import React, { useCallback, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { ProceedInterface } from '../type';
import WDataTable, { baseOption } from '@components/common/dataGrid/WDataTable';
import { Button, Stack, Typography } from '@mui/material';
import { dateFormat } from '@utils/date';
import GridButton from '@components/common/button/modules/GridButton';
import {
  CheckIcon,
  UserIcon,
  CheckIconGray,
  PencilIcon,
} from '@components/common/dataDisplay/WIcons';
import RequesterModal from '@components/preparation/modals/RequesterModal';
import PrescriptionModal from '@components/preparation/modals/PrescriptionModal';
import DispensingModal from '@components/preparation/modals/DispensingModal';
import DispensingExpensesModal from '@components/preparation/modals/DispensingExpensesModal';

const ProceedTable = (props: { data: ProceedInterface[] }): JSX.Element => {
  const { data } = props;
  const [requesterId, setRequesterId] = useState<string>('');
  const [requesterOpen, setRequesterOpen] = useState<boolean>(false);
  const [prescriptionId, setPrescriptionId] = useState<string>('');
  const [prescriptionOpen, setPrescriptionOpen] = useState<boolean>(false);

  const [dispensingExpensesId, setDispensingExpensesId] = useState<string>('');
  const [dispensingExpensesOpen, setDispensingExpensesOpen] =
    useState<boolean>(false);
  const [completedId, setCompletedId] = useState<string>('');
  const [completedOpen, setCompletedOpen] = useState<boolean>(false);

  const rows = data.map((item, index) => {
    return { ...item, ['id']: index };
  });

  const requesterOnOff = useCallback((id: string, open: boolean) => {
    setRequesterId(id);
    setRequesterOpen(open);
  }, []);
  const prescriptionIdOnOff = useCallback((id: string, open: boolean) => {
    setPrescriptionId(id);
    setPrescriptionOpen(open);
  }, []);
  const dispensingExpensesOnOff = useCallback((id: string, open: boolean) => {
    setDispensingExpensesId(id);
    setDispensingExpensesOpen(open);
  }, []);
  const completedOnOff = useCallback((id: string, open: boolean) => {
    setCompletedId(id);
    setCompletedOpen(open);
  }, []);

  const columns: GridColDef[] = [
    {
      ...baseOption,
      field: 'statusNameKo',
      headerName: '상태',
      width: 80,
    },
    {
      ...baseOption,
      field: 'completionAt',
      headerName: '조제 완료 시간',
      width: 120,
      renderCell: (params) => {
        const { dayTime } = dateFormat(params.row.completionAt);
        return <>{dayTime}</>;
      },
    },
    {
      ...baseOption,
      field: 'deliveryFormKo',
      headerName: '수령 방법',
      width: 80,
    },

    {
      ...baseOption,
      field: 'requesterInfo',
      headerName: '요청자 정보',
      width: 130,
      renderCell: (prams) => {
        const { deliveryStatus, status, ulid } = prams.row;
        return (
          <GridButton
            onClick={() => requesterOnOff(ulid, true)}
            startIcon={<UserIcon />}
            disabled={
              status === 'CANCEL'
                ? true
                : deliveryStatus === 'COMPLETION'
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
      field: 'treatHospitalName',
      headerName: '진료 병원 명',
      width: 180,
      renderCell: (prams) => {
        return (
          <Stack justifyContent={'center'} width="100%">
            <Typography textAlign={'center'}>
              {prams.row.treatHospitalName}
            </Typography>
          </Stack>
        );
      },
    },
    {
      ...baseOption,
      field: 'treatDoctorName',
      headerName: '진료 병원 의사 명',
      width: 110,
    },
    {
      ...baseOption,
      field: 'treatHospitalPhone',
      headerName: '병원 연락처',
      width: 105,
    },
    {
      ...baseOption,
      field: 'prescriptionPreview',
      headerName: '처방전 보기',
      width: 130,
      renderCell: (prams) => {
        const { status, deliveryStatus, ulid } = prams.row;
        return (
          <GridButton
            onClick={() => prescriptionIdOnOff(ulid, true)}
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
      width: 130,
      renderCell: (prams) => {
        const { ulid } = prams.row;
        return (
          <GridButton
            onClick={() => dispensingExpensesOnOff(ulid, true)}
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
      width: 130,
      renderCell: (prams) => {
        const { status, ulid } = prams.row;
        return (
          <GridButton
            onClick={() => completedOnOff(ulid, true)}
            startIcon={<CheckIconGray />}
            disabled={status === 'PAYMENT_WAITING' ? true : false}
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
      {requesterId ? (
        <RequesterModal
          id={requesterId}
          open={requesterOpen}
          handleClose={() => requesterOnOff('', false)}
        />
      ) : (
        ''
      )}
      {/* 처방전 보기 */}
      {prescriptionId ? (
        <PrescriptionModal
          id={prescriptionId}
          open={prescriptionOpen}
          handleClose={() => prescriptionIdOnOff('', false)}
        />
      ) : (
        ''
      )}
      {/* 조제비 수정 */}
      {dispensingExpensesId ? (
        <DispensingExpensesModal
          id={dispensingExpensesId}
          open={dispensingExpensesOpen}
          handleClose={() => dispensingExpensesOnOff('', false)}
        />
      ) : (
        ''
      )}
      {/* 조제비 수정 */}
      {completedId ? (
        <DispensingModal
          id={completedId}
          open={completedOpen}
          handleClose={() => completedOnOff('', false)}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default ProceedTable;
