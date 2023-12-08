import {
  Box,
  Button,
  Grid,
  Stack,
  styled,
  Theme,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import wau_logo from 'public/assets/logo/be_plus_health_care_logo.png';
import { borderRight, SxProps } from '@mui/system';
import { FlexBtwR, FlexCenterR, FlexStartR } from '@styles/flexGrid';
import WSubTitle from '../typography/WSubTitle';
import { FlexCenter } from './styled';

export const FooterGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '9px',
}));

export const FooterTypography = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: '#777',
  paddingRight: '9px',
  borderRight: '1px solid #f2f2f2',
  lineHeight: '16px',
  letterSpacing: '-0.16px',
}));

export const FooterButton = styled(Button)(({ theme }) => ({
  ...theme.typography.body2,
  color: '#666',
  lineHeight: '16px',
  letterSpacing: '-0.16px',
  padding: '0px',
}));

const Footer = (props: { sx?: SxProps<Theme> }) => {
  const onPressPartner = () => {
    window.open('/terms/partner-agree');
  };
  const onPressPrivacy = () => {
    window.open('/terms/privacy-agree');
  };
  const onPressPrivacyPolicy = () => {
    window.open('/terms/privacy-policy');
  };
  return <Stack gap={'24px'} sx={props.sx} width="900px"></Stack>;
};

export default Footer;
