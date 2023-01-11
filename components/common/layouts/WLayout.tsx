import { SxProps, Theme } from '@mui/material';
import WauLogo from 'public/assets/logo/logo_login.png';
import Image from 'next/image';
import { Container, FlexCenter, ImageBox } from './styled';

interface LogoType {
  width?: string;
  sx?: SxProps<Theme>;
}

export const Logo = (props: LogoType) => {
  const { width, sx } = props;
  return (
    <ImageBox width={width ? width : '130px'} sx={sx}>
      <Image src={WauLogo} alt="로고" layout="fill" />
    </ImageBox>
  );
};

export const WLayout = (props: {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
  bg?: string;
  containerColor?: string;
  sx?: SxProps<Theme>;
}) => {
  const { children, bg, containerColor, sx } = props;
  return (
    <FlexCenter sx={{ backgroundColor: bg ? bg : '#fff' }}>
      <Container
        sx={{
          backgroundColor: containerColor ? containerColor : '#fff',
          ...sx,
        }}
      >
        {children}
      </Container>
    </FlexCenter>
  );
};
