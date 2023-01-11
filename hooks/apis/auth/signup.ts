import { SignupInfo } from '@components/auth/signup/type';
import { useMutation, useQueryClient } from 'react-query';
import instance from '../instance';

/**회원가입 api */
export const postSignupInfo = (info: SignupInfo) => {
  return instance({
    method: 'post',
    url: `/auth/api/v1/hospital/signup`,
    data: JSON.stringify(info),
  });
};

/**회원가입 파일 업로드 api */
export const postAuthFileUpload = (file: FormData) => {
  return instance({
    method: 'post',
    url: `/auth/api/v1/hospital/upload`,
    data: file,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**회원가입 mutation react query */
export const useSignupInfoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((person: SignupInfo) => postSignupInfo(person), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['signup', 'post', 'info']);
    },
  });
};

/**회원가입 파일 업로드 mutation react query */
export const useAuthFileUpload = () => {
  const queryClient = useQueryClient();
  return useMutation((person: FormData) => postAuthFileUpload(person), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['signup', 'post', 'file']);
    },
  });
};
