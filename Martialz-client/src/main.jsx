import React from 'react'
import ReactDOM from 'react-dom/client'
import  { Toaster } from 'react-hot-toast';
import {
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Routes from './routes/Routes';
import AuthProvider from './Provider/AuthProvider';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
       <Toaster />
       <RouterProvider router={Routes} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
)
