import { useEffect, useState } from 'react';
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
import { useRouter } from 'next/router';
import { UserInfoProvider } from '@hooks/contexts/user/UserInfoContext';
import Script from 'next/script';
import * as gtag from '@utils/gtag';
import ReactQueryClientProvider from '@hooks/contexts/user/ReactQueryClientProvider';

LicenseInfo.setLicenseKey(`${process.env.NEXT_PUBLIC_MUI_PRO_KEY}`);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
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
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
 window.dataLayer = window.dataLayer || [];
 function gtag(){dataLayer.push(arguments);}
 gtag('js', new Date());
 gtag('config', '${gtag.GA_TRACKING_ID}', {
   page_path: window.location.pathname,
 });
`,
        }}
      />
      <ReactQueryClientProvider>
        <UserInfoProvider>
          <Global styles={globals} />
          <ThemeProvider theme={theme}>
            <ToastContextProvider>
              <Hydrate state={pageProps.dehydratedState}>
                <ReactQueryDevtools initialIsOpen={true} />
                <WProgressBar />
                <Head>
                  <title>어다아파 약국 앱</title>
                </Head>
                <Component {...pageProps} />
              </Hydrate>
            </ToastContextProvider>
          </ThemeProvider>
        </UserInfoProvider>
      </ReactQueryClientProvider>
    </>
  );
}
