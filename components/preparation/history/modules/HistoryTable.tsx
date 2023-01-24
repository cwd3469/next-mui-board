import React, { useCallback, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { HistoryInterface } from '../type';
import WDataTable, { baseOption } from '@components/common/dataGrid/WDataTable';
import { Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { dateFormat } from '@utils/date';
import GridButton from '@components/common/button/modules/GridButton';
import {
  CheckIcon,
  TruckIcon,
  UserIcon,
} from '@components/common/dataDisplay/WIcons';
import RequesterModal from '@components/preparation/modals/RequesterModal';
import PrescriptionModal from '@components/preparation/modals/PrescriptionModal';
import DeliveryRequestModal from '@components/preparation/modals/DeliveryRequestModal';

const HistoryTable = (props: { data: HistoryInterface[] }): JSX.Element => {
  const { data } = props;
  const [requesterId, setRequesterId] = useState<string>('');
  const [requesterOpen, setRequesterOpen] = useState<boolean>(false);
  const [prescriptionId, setPrescriptionId] = useState<string>('');
  const [prescriptionOpen, setPrescriptionOpen] = useState<boolean>(false);
  const [deliveryId, setDeliveryId] = useState<string>('');
  const [deliveryMode, setDeliveryMode] =
    useState<'sameDay' | 'delivery' | ''>('');
  const [deliveryOpen, setDeliveryOpen] = useState<boolean>(false);

  const rows = data.map((item, index) => {
    return { ...item, ['id']: index };
  });
  const router = useRouter();

  const requesterOnOff = useCallback((id: string, open: boolean) => {
    setRequesterId(id);
    setRequesterOpen(open);
  }, []);
  const prescriptionIdOnOff = useCallback((id: string, open: boolean) => {
    setPrescriptionId(id);
    setPrescriptionOpen(open);
  }, []);
  const deliveryIdOnOff = useCallback(
    (id: string, open: boolean, mode: 'sameDay' | 'delivery' | '') => {
      setDeliveryId(id);
      setDeliveryOpen(open);
      setDeliveryMode(mode);
    },
    [],
  );

  const onNoticeDetail = useCallback(
    (id: string) => {
      router.push({
        pathname: `/notice/${id}`,
      });
    },
    [router],
  );

  const columns: GridColDef[] = [
    {
      ...baseOption,
      field: 'statusNameKo',
      headerName: '상태',
      width: 70,
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
      field: 'refuseReason',
      headerName: '거절 사유',
      width: 120,
      renderCell: (params) => {
        return (
          <Typography textAlign="center">
            {params.row.refuseReason ? params.row.refuseReason : '-'}
          </Typography>
        );
      },
    },
    {
      ...baseOption,
      field: 'deliveryFormKo',
      headerName: '수령 방법',
      width: 70,
    },
    {
      ...baseOption,
      field: 'deliveryStatusKo',
      headerName: '배송 상태',
      width: 130,
      renderCell: (prams) => {
        const {
          deliveryStatus,
          deliveryStatusKo,
          waybillNumber,
          courier,
          deliveryForm,
        } = prams.row;
        return deliveryForm !== 'DELIVERY' ? (
          deliveryStatusKo
        ) : deliveryStatus === 'WAIT' ? (
          deliveryStatusKo
        ) : (
          <Stack justifyContent={'center'} width="100%">
            <Typography textAlign={'center'}>{courier}</Typography>
            <Typography textAlign={'center'}>{waybillNumber}</Typography>
          </Stack>
        );
      },
    },
    {
      ...baseOption,
      field: 'requesterInfo',
      headerName: '요청자 정보',
      width: 120,
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
      width: 125,
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
      width: 100,
    },
    {
      ...baseOption,
      field: 'prescriptionPreview',
      headerName: '처방전 보기',
      width: 120,
      renderCell: (prams) => {
        const { status, deliveryStatus, ulid } = prams.row;
        return (
          <GridButton
            onClick={() => prescriptionIdOnOff(ulid, true)}
            startIcon={<CheckIcon />}
            disabled={
              status === 'CANCEL'
                ? true
                : deliveryStatus === 'WAIT'
                ? false
                : true
            }
          >
            처방전 보기
          </GridButton>
        );
      },
    },
    {
      ...baseOption,
      field: 'shippingRequest',
      headerName: '배송 요청',
      width: 120,
      renderCell: (prams) => {
        const { status, deliveryStatus, ulid, deliveryForm } = prams.row;
        const mode = deliveryForm === 'DELIVERY' ? 'delivery' : 'sameDay';
        return (
          <GridButton
            onClick={() => deliveryIdOnOff(ulid, true, mode)}
            startIcon={<TruckIcon />}
            disabled={
              status === 'CANCEL'
                ? true
                : deliveryStatus === 'WAIT'
                ? false
                : true
            }
          >
            배송 요청
          </GridButton>
        );
      },
    },
  ];

  return (
    <>
      <WDataTable rows={rows} columns={columns} />
      {requesterId ? (
        <RequesterModal
          id={requesterId}
          open={requesterOpen}
          handleClose={() => requesterOnOff('', false)}
        />
      ) : (
        ''
      )}
      {prescriptionId ? (
        <PrescriptionModal
          id={prescriptionId}
          open={prescriptionOpen}
          handleClose={() => prescriptionIdOnOff('', false)}
        />
      ) : (
        ''
      )}
      {deliveryId ? (
        <DeliveryRequestModal
          mode={deliveryMode}
          id={deliveryId}
          open={deliveryOpen}
          handleClose={() => deliveryIdOnOff('', false, '')}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default HistoryTable;
