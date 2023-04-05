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
import { transDeliveryMethod, transMedicineStatus } from '@utils/transtext';
import { ReceiveData } from '@components/preparation/request/modules/RequestTable';

const HistoryTable = (props: { data: HistoryInterface[] }): JSX.Element => {
  const { data } = props;
  const [receiveData, setReceiveData] = useState<ReceiveData>();
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

  const requesterOnOff = useCallback((open: boolean, info?: ReceiveData) => {
    setReceiveData(info);
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

  const columns: GridColDef[] = [
    {
      ...baseOption,
      field: 'medicineStatus',
      headerName: '상태',
      width: 70,
      renderCell: (params) => {
        return <>{transMedicineStatus(params.row.medicineStatus)}</>;
      },
    },
    {
      ...baseOption,
      field: 'requestDateTime',
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
      field: 'deliveryMethod',
      headerName: '수령 방법',
      width: 70,
      renderCell: (params) => {
        return <>{transDeliveryMethod(params.row.deliveryMethod)}</>;
      },
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
      field: 'receiveData',
      headerName: '요청자 정보',
      width: 120,
      renderCell: (prams) => {
        const { deliveryStatus, medicineStatus, receiveData } = prams.row;

        return (
          <GridButton
            onClick={() => requesterOnOff(true, receiveData)}
            startIcon={<UserIcon />}
            disabled={
              medicineStatus === 'REFUSE'
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
      field: 'hospitalNameKo',
      headerName: '진료 병원 명',
      width: 125,
    },
    {
      ...baseOption,
      field: 'doctorNameKo',
      headerName: '진료 병원 의사 명',
      width: 100,
    },
    {
      ...baseOption,
      field: 'hospitalPhoneNum',
      headerName: '병원 연락처',
      width: 100,
    },
    {
      ...baseOption,
      field: 'prescriptionPreview',
      headerName: '처방전 보기',
      width: 120,
      renderCell: (prams) => {
        const { medicineStatus, deliveryStatus, ulid } = prams.row;
        return (
          <GridButton
            onClick={() => prescriptionIdOnOff(ulid, true)}
            startIcon={<CheckIcon />}
            disabled={
              medicineStatus === 'REFUSE'
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
        const { status, medicineStatus, ulid, deliveryMethod } = prams.row;
        const mode = deliveryMethod === 'PARCEL' ? 'delivery' : 'sameDay';
        return (
          <GridButton
            onClick={() => deliveryIdOnOff(ulid, true, mode)}
            startIcon={<TruckIcon />}
            disabled={
              medicineStatus === 'REFUSE'
                ? true
                : medicineStatus === 'REGIST'
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
