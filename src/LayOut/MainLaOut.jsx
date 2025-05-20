import React from 'react';
import Navbar from '../Component/Navbar';
import { Outlet, useLocation } from 'react-router';
import Banner from '../Component/Bannner';
import Footer from '../Component/Fotter';

const MainLaOut = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div>
      <Navbar />
      {isHome && <Banner />}
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default MainLaOut;
