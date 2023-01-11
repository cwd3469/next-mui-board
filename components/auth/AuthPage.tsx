import { Stack } from '@mui/material';
import SigninPage from './signin/SigninPage';
import Signup from './signup/Signup';
import { SigninLayout } from './styled';

const AuthPage = () => {
  return (
    <SigninLayout>
      <Stack>
        <SigninPage />
        <Signup />
      </Stack>
    </SigninLayout>
  );
};

export default AuthPage;
