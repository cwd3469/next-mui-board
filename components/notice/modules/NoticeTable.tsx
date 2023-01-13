import React, { useCallback } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { NoticeInterface } from '../type';
import WDataTable, { baseOption } from '@components/common/dataGrid/WDataTable';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

const NoticeTable = (props: { data: NoticeInterface[] }): JSX.Element => {
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
      field: 'number',
      headerName: '번호',
      width: 200,
    },
    {
      ...baseOption,
      field: 'status',
      headerName: '구분',
      width: 200,
    },
    {
      ...baseOption,
      field: 'title',
      headerName: '제목',
      width: 600,
      renderCell(params) {
        return (
          <Button
            sx={{
              width: '100%',
              height: '62px',
              color: '#555',
              fontWeight: '400',
            }}
            variant="text"
            onClick={() => onNoticeDetail(params.row.ulid)}
          >
            {params.row.title}
          </Button>
        );
      },
    },
    {
      ...baseOption,
      field: 'createAt',
      headerName: '작성일',
      width: 190,
    },
  ];

  return <WDataTable rows={rows} columns={columns} />;
};

export default NoticeTable;
