import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { useContext } from 'react';
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false
    },
  },
})

const ws = new WebSocket('ws://hive.com:3020')
export const HiveSocket = React.createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <HiveSocket.Provider value={ws}>
          <App />
          <ReactQueryDevtools />
        </HiveSocket.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);