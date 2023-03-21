import { apiPrivacyPolicy } from '@hooks/apis/myinfo';
import { useEffect, useState } from 'react';

const PrivacyPolicy = () => {
  const [html, setHtml] = useState<string>('');
  useEffect(() => {
    apiPrivacyPolicy()
      .then((data) => {
        setHtml(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};

export default PrivacyPolicy;
