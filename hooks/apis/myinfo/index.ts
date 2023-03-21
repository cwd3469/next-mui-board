import { getCookie } from 'cookies-next';
import instance from '../instance';

export const apiPharmacyAdminMyinfo = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `pharmacy/api/v2/my-info`,
    headers: {
      Authorization: accessToken,
    },
  });
};

export const apiPrivacyUsageAgreement = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  return instance({
    method: 'get',
    url: `pharmacy/api/v1/terms/privacy-usage-agreement`,
    headers: {
      Authorization: accessToken,
    },
  });
};

export const apiPrivacyPolicy = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `pharmacy/api/v1/terms/privacy-policy`,
    headers: {
      Authorization: accessToken,
    },
  });
};

export const apiPartnerAgreement = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `pharmacy/api/v1/terms/partner-agreement`,
    headers: {
      Authorization: accessToken,
    },
  });
};
