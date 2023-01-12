import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { NoticeInterface } from '../type';
import WDataTable, { baseOption } from '@components/common/dataGrid/WDataTable';

const NoticeTable = (props: { data: NoticeInterface[] }): JSX.Element => {
  const { data } = props;
  const rows = data.map((item, index) => {
    return { ...item, ['id']: index };
  });

  const columns: GridColDef[] = [
    {
      field: 'number',
      headerName: '번호',
      width: 200,
      ...baseOption,
    },
    {
      field: 'status',
      headerName: '구분',
      width: 200,
      ...baseOption,
    },
    {
      field: 'title',
      headerName: '제목',
      width: 600,
      ...baseOption,
    },
    {
      field: 'createAt',
      headerName: '작성일',
      width: 190,
      ...baseOption,
    },
  ];

  return <WDataTable rows={rows} columns={columns} />;
};

export default NoticeTable;
