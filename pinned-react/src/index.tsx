import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../app/globals.css';
import './styles/tailwind.css';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
 
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient(); // React Query client

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} /* navigate={(to) => ...} */>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ClerkProvider>
  </React.StrictMode>
);