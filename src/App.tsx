import './index.css';

import React, { Suspense } from 'react';
import { useRoutes} from 'react-router-dom';

import { useAuthSelector } from './Hooks/StateHooks';
import appRoutes from './Routes/AppRoutes';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Navbar from './Components/StructureComponents/Navbar';
import Footer from './Components/StructureComponents/FooterSection';
import LandingPageBar from './Components/StructureComponents/LandingPageBar';
import { queryClient } from './Services/API/ApiInstance';

function App() {
  //const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; // Ensure it returns a boolean
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true'; // Ensure it returns a boolean
  //const isAuthenticated = useAuthSelector((state) => state.auth.isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        {isAuthenticated ? <Navbar/> : <LandingPageBar/>}
        {useRoutes(appRoutes)}
        {<Footer/>}
      </Suspense>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;