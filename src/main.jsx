
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AuthProvider from './PrivateRouter/AuthPrivate';
import { RouterProvider } from 'react-router';
import Router from './Router/Router';
import { ThemeProvider } from './Component/Theme';

createRoot(document.getElementById('root')).render(

    <ThemeProvider>
      <AuthProvider>
     <RouterProvider router={Router}></RouterProvider>
    </AuthProvider>
    </ThemeProvider>
 
);
