import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { userInfoContext } from '../userInfoContext';

const ReactQueryClientProvider = (props: {
  children: JSX.Element | JSX.Element[];
}) => {
  const router = useRouter();
  const { handleTokenInfo } = useContext(userInfoContext);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1800000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchInterval: 1800000,
            retry: 1,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSuccess(data: any) {
              if (router.pathname !== '/signin') {
                if (
                  data.config.url !==
                  '/telemedicine/api/v1/telemedicine-clinic/status'
                ) {
                  if (data.config.url !== 'auth/api/v1/refresh') {
                    if (data.config.method === 'POST') {
                      if (handleTokenInfo) {
                        handleTokenInfo();
                      }
                      return;
                    }
                    if (data.config.method === 'DELETE') {
                      if (handleTokenInfo) {
                        handleTokenInfo();
                      }
                      return;
                    }
                    if (data.config.method === 'PUT') {
                      if (handleTokenInfo) {
                        handleTokenInfo();
                      }
                      return;
                    }
                  }
                }
              }
            },
          },
          mutations: {
            retry: 1,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export default ReactQueryClientProvider;
