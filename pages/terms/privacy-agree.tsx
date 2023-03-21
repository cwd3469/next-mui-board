import { apiPrivacyUsageAgreement } from '@hooks/apis/myinfo';
import { useEffect, useState } from 'react';

const PrivacyAgree = () => {
  const [html, setHtml] = useState<string>('');
  useEffect(() => {
    apiPrivacyUsageAgreement()
      .then((data) => {
        setHtml(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};

export default PrivacyAgree;
