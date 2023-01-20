import React, { useCallback } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { HistoryInterface } from '../type';
import WDataTable, { baseOption } from '@components/common/dataGrid/WDataTable';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { dateFormat } from '@utils/date';
import GridButton from '@components/common/button/modules/GridButton';

const HistoryTable = (props: { data: HistoryInterface[] }): JSX.Element => {
  const { data } = props;
  const rows = data.map((item, index) => {
    return { ...item, ['id']: index };
  });
  const router = useRouter();
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
      field: 'receive',
      headerName: '수령 방법',
      width: 70,
    },
    {
      ...baseOption,
      field: 'deliveryStatusKo',
      headerName: '배송 상태',
      width: 130,
    },
    {
      ...baseOption,
      field: 'requesterInfo',
      headerName: '요청자 정보',
      width: 120,
      renderCell: () => {
        return <GridButton>요청자 정보</GridButton>;
      },
    },
    {
      ...baseOption,
      field: 'treatHospitalName',
      headerName: '진료 병원 명',
      width: 125,
      renderCell: (params) => {
        return (
          <Typography textAlign="center">
            {params.row.refuseReason ? params.row.treatHospitalName : '-'}
          </Typography>
        );
      },
    },
    {
      ...baseOption,
      field: 'treatDoctorName',
      headerName: '진료 병원 의사 명',
      width: 100,
      renderCell: (params) => {
        return (
          <Typography textAlign="center">
            {params.row.refuseReason ? params.row.treatDoctorName : '-'}
          </Typography>
        );
      },
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
      renderCell: () => {
        return <GridButton>처방전 보기</GridButton>;
      },
    },
    {
      ...baseOption,
      field: 'shippingRequest',
      headerName: '배송 요청',
      width: 120,
      renderCell: () => {
        return <GridButton>배송 요청</GridButton>;
      },
    },
  ];

  return <WDataTable rows={rows} columns={columns} />;
};

export default HistoryTable;
