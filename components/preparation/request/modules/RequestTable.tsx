import React, { useCallback, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { RequestInterface } from '../type';
import WDataTable, { baseOption } from '@components/common/dataGrid/WDataTable';
import { Stack, Typography } from '@mui/material';
import { dateFormat } from '@utils/date';
import GridButton from '@components/common/button/modules/GridButton';
import { CheckIcon, UserIcon } from '@components/common/dataDisplay/WIcons';
import RequesterModal from '@components/preparation/modals/RequesterModal';
import DispensingAccepModal from '@components/preparation/modals/DispensingAccepModal';

const RequestTable = (props: { data: RequestInterface[] }): JSX.Element => {
  const { data } = props;
  const [requesterId, setRequesterId] = useState<string>('');
  const [requesterOpen, setRequesterOpen] = useState<boolean>(false);
  const [prescriptionId, setPrescriptionId] = useState<string>('');
  const [prescriptionOpen, setPrescriptionOpen] = useState<boolean>(false);
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

  const columns: GridColDef[] = [
    {
      ...baseOption,
      field: 'statusNameKo',
      headerName: '상태',
      width: 120,
    },
    {
      ...baseOption,
      field: 'completionAt',
      headerName: '조제 완료 시간',
      width: 180,
      renderCell: (params) => {
        const { dayTime } = dateFormat(params.row.completionAt);
        return <>{dayTime}</>;
      },
    },
    {
      ...baseOption,
      field: 'deliveryFormKo',
      headerName: '수령 방법',
      width: 110,
    },

    {
      ...baseOption,
      field: 'requesterInfo',
      headerName: '요청자 정보',
      width: 150,
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
      width: 240,
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
      width: 100,
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
      width: 180,
      renderCell: (prams) => {
        const { status, deliveryStatus, ulid } = prams.row;
        return (
          <GridButton
            onClick={() => prescriptionIdOnOff(ulid, true)}
            startIcon={<CheckIcon />}
          >
            조제 수락 / 거절
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
      {/* 조제 수락 보기 */}
      {prescriptionId ? (
        <DispensingAccepModal
          id={prescriptionId}
          open={prescriptionOpen}
          handleClose={() => prescriptionIdOnOff('', false)}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default RequestTable;
