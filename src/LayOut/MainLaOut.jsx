import React from 'react';
import Navbar from '../Component/Navbar';
import { Outlet, useLocation } from 'react-router';
import Banner from '../Component/Bannner';
import Footer from '../Component/Fotter';

const MainLaOut = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div >
     <div className='w-11/12 mx-auto'>
       <Navbar />
   
      {isHome && <Banner />}
        
      <Outlet />
     </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLaOut;
