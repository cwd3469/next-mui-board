import { Stack } from '@mui/material';
import Signup from './signup/Signup';
import { SigninLayout } from './styled';

const AuthPage = () => {
  return (
    <SigninLayout>
      <Stack>
        <Signup />
      </Stack>
    </SigninLayout>
  );
};

export default AuthPage;
