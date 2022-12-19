import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Global } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import { LicenseInfo } from '@mui/x-license-pro';
import WProgressBar from '@components/common/modals/WProgressBar';
import { ToastContextProvider } from '@hooks/utils/useToastContext';
import { theme } from '@styles/theme';
import globals from '@styles/globals';

LicenseInfo.setLicenseKey(`${process.env.NEXT_PUBLIC_MUI_PRO_KEY}`);

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 600000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchInterval: 600000,
            retry: false,
          },
        },
      }),
  );
  return (
    <>
      <Global styles={globals} />
      <ThemeProvider theme={theme}>
        <ToastContextProvider>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <ReactQueryDevtools initialIsOpen={true} />
              <WProgressBar />
              <Head>
                <title>어다아파 병원 앱</title>
              </Head>
              <Component {...pageProps} />
            </Hydrate>
          </QueryClientProvider>
        </ToastContextProvider>
      </ThemeProvider>
    </>
  );
}
