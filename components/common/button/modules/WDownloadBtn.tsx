import styled from '@emotion/styled';
import { Box, Grid, Link, SxProps, Typography } from '@mui/material';
import { Theme } from '@mui/system';
import Image from 'next/image';
import downloadIcon from 'public/assets/icon/downloadIcon.svg';
import copyDisable from 'public/assets/icon/copyDisable.svg';
import { CSSProperties } from 'react';

interface WDownloadBtnType {
  sx?: SxProps<Theme>;
  failed: boolean;
  disabled?: boolean;
  url: string;
  download?: string;
}

const WDownloadBtn = (props: WDownloadBtnType) => {
  const { failed, url, disabled, sx, download } = props;
  return (
    <DownloadBtn
      className="wDownloadBtn"
      href={failed ? undefined : url}
      download={download ? download : true}
      sx={{
        color: failed ? '#b6b6b6' : url ? '#000' : '#b6b6b6',
        ...sx,
      }}
    >
      <Grid
        container
        width="100%"
        height={'100%'}
        justifyContent="center"
        alignItems={'center'}
        gap="5px"
      >
        <Box width={'16px'} height={'16px'} position="relative">
          <Image
            src={downloadIcon}
            alt="copy"
            layout="fill"
            objectFit="contain"
          />
        </Box>

        <Typography
          variant="body2"
          letterSpacing={'-1px'}
          marginTop="2px"
          color="#949494"
        >
          다운로드
        </Typography>
      </Grid>
    </DownloadBtn>
  );
};

const DownloadBtn = styled(Link)(({ theme }) => ({
  backgroundColor: '#fff',
  textDecoration: 'none',
  border: '2px solid #e0e1e2',
  height: '48px',
  width: '120px',
  borderRadius: '6px',
}));

export default WDownloadBtn;
