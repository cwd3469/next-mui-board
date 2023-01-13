/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Box,
  Grid,
  Button,
  Typography,
  styled,
  SxProps,
  Theme,
} from '@mui/material';
import Image from 'next/image';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import copyIcon from 'public/assets/icon/copyIcon.svg';
import copyDisable from 'public/assets/icon/copyDisable.svg';
import { Stack } from '@mui/system';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const GridButton = (props: {
  onClick?: () => void;
  children: string | JSX.Element;
  disabled?: boolean;
  style?: SxProps<Theme>;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}) => {
  const { onClick, children, disabled, style, startIcon, endIcon } = props;

  return (
    <Button
      disabled={disabled}
      variant="outlined"
      color="info"
      size="small"
      onClick={onClick}
      sx={{
        borderRadius: '6px',
        border: '1px solid #e0e1e2',
        padding: '5px 8px',
        '&.Mui-disabled': {
          backgroundColor: '#f8f8f8',
        },
        ...style,
      }}
    >
      <Grid container gap="7px" alignItems="center">
        {startIcon ? (
          startIcon
        ) : (
          <Image src={disabled ? copyDisable : copyIcon} alt="copy" />
        )}
        <Typography variant="caption" letterSpacing={'-1px'} marginTop="2px">
          {children}
        </Typography>
        {endIcon ? endIcon : ''}
      </Grid>
    </Button>
  );
};
GridButton.defaultProps = {
  disable: false,
};

const NoData = (props: { txt?: string }) => {
  const { txt } = props;
  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <Stack
        height="50px"
        gap="6px"
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Grid container justifyContent="center" color="#999">
          {' '}
          <InfoOutlinedIcon sx={{ fontSize: '15px' }} />
        </Grid>
        <Typography color="#999" fontWeight="400" lineHeight={'1'}>
          {txt ? txt : '조회 내역이 없습니다.'}
        </Typography>
      </Stack>
    </Stack>
  );
};

export const baseOption = {
  sortable: false,
  editable: false,
  filterable: false,
  hideable: false,
};

const WDataTable = (props: {
  rows: any;
  columns: GridColDef[];
  headerHeight?: number;
  rowHeight?: number;
  pageSize?: number;
  noDataTxt?: string;
  sx?: SxProps<Theme>;
}): JSX.Element => {
  const { rows, columns, headerHeight, rowHeight, pageSize, noDataTxt } = props;

  const Component = () => {
    return NoData({ txt: noDataTxt });
  };
  return (
    <Box height="706px" sx={props.sx}>
      <DataTable
        headerHeight={headerHeight ? headerHeight : 64}
        rowHeight={rowHeight ? rowHeight : 64}
        rows={rows}
        columns={columns}
        pageSize={pageSize ? pageSize : 10}
        rowsPerPageOptions={[10]}
        components={{
          NoRowsOverlay: Component,
          NoResultsOverlay: Component,
        }}
      />
    </Box>
  );
};

const DataTable = styled(DataGrid)(({ theme }) => ({
  '&.MuiDataGrid-root': {
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  '& .MuiDataGrid-columnHeader ,& .MuiDataGrid-cell': {
    padding: '0px',
    whiteSpace: 'break-spaces !important',
  },
  '& .MuiDataGrid-columnHeadersInner': {
    backgroundColor: '#FDFDFD',
  },
  '& .MuiDataGrid-columnHeaderTitleContainer': {
    ...theme.typography.body1,
    justifyContent: 'center',
  },

  '& .MuiDataGrid-cell': {
    ...theme.typography.body1,
    justifyContent: 'center',
    color: '#555555',
  },
  '& .MuiDataGrid-row ': {
    '& .MuiTypography-root': {
      letterSpacing: '-0.14px',
    },
  },
  '& .MuiDataGrid-columnSeparator': {
    '& .MuiSvgIcon-root': {
      display: 'none',
    },
  },
  '& .MuiDataGrid-menuIcon': {
    display: 'none',
  },
  '& .MuiDataGrid-virtualScrolle': {
    overflowX: 'hidden',
    overflowY: 'scroll',
  },
  '& .MuiDataGrid-footerContainer': {
    display: 'none',
  },
}));

export default WDataTable;