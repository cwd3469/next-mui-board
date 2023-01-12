import { Stack } from '@mui/material';
import FindAccount from './findAccount/FindAccount';
import SigninPage from './signin/SigninPage';
import Signup from './signup/Signup';
import { SigninLayout } from './styled';

const AuthPage = () => {
  return (
    <SigninLayout>
      <Stack>
        <SigninPage />
        <Signup />
        <FindAccount />
      </Stack>
    </SigninLayout>
  );
};

export default AuthPage;
