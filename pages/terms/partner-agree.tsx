import { apiPartnerAgreement } from '@hooks/apis/myinfo';
import { useEffect, useState } from 'react';

const PartnerAgree = () => {
  const [html, setHtml] = useState<string>('');
  useEffect(() => {
    apiPartnerAgreement()
      .then((data) => {
        setHtml(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};

export default PartnerAgree;
