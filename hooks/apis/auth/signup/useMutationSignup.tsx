import { SignupInfo } from '@components/auth/signup/type';
import { mobileFormatOff } from '@utils/formatNumber';
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { apiSignupInfo } from '.';

const useMutationSignup = (props: {
  info?: SignupInfo;
  mobileValue: string;
}) => {
  const { info, mobileValue } = props;
  const [signupInfo, setSignupInfo] = useState<FormData>();
  const { mutate: mutateSignupInfo } = useMutation(apiSignupInfo);

  const onClickSignup = useCallback(() => {
    if (signupInfo) {
      mutateSignupInfo(signupInfo, {
        onSuccess(data, variables, context) {
          console.log(data);
        },
        onError(error, variables, context) {
          console.log(error);
        },
      });
    }
  }, [mutateSignupInfo, signupInfo]);
  /**회원가입 신청 이벤트 */

  useEffect(() => {
    if (info) {
      const formData = new FormData();
      formData.append('accountId', info.id as string);
      formData.append('password', info.pw as string);
      formData.append('reenterPassword', info.rePw as string);
      formData.append('adminNameKo', info.name as string);
      formData.append('adminMobileNum', mobileFormatOff(mobileValue) as string);
      formData.append('pharmacyNameKo', info.pharmacyName);
      formData.append('pharmacyAddr', info.pharmacyAddress);
      formData.append('pharmacyAddrDetail', info.addressDetail);
      formData.append('pharmacyZipCode', info.postCode);
      formData.append('pharmacyFaxNum', info.pharmacyFaxNum);
      formData.append('bizRegNum', mobileFormatOff(info.buisNum));
      if (info.businessLicense) {
        formData.append('bizCertFile', info.businessLicense);
      }
      if (info.pharmacistLicense) {
        formData.append('licenseFile', info.pharmacistLicense);
      }
      if (info.bankbookCopy) {
        formData.append('passbookCopyFile', info.bankbookCopy);
      }
      if (info.pharmacyPhone) {
        formData.append(
          'pharmacyPhoneNum',
          mobileFormatOff(info.pharmacyPhone),
        );
      }

      setSignupInfo(formData);
    }
  }, [info, mobileValue, props.info]);

  return { onClickSignup };
};

export default useMutationSignup;
