import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../app/globals.css';
import './styles/tailwind.css';
import App from './App';
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const root = document.getElementById('root');

if (!root) {
  throw new Error("Root element not found");
}

const queryClient = new QueryClient(); // React Query client

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
  root
);
