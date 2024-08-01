import { ReactNode } from 'react';
import Footer from '../appComoponent/Footer';
import Navbar from '../appComoponent/Navbar';
import TopBar from '../appComoponent/TopBar';
import BreadCrumbs from '../appComoponent/BreadCrumb';
import { setTimeout } from 'timers/promises';

interface ProductPageLayout {
  children: ReactNode;
}

const RootLayout = async ({ children }: ProductPageLayout) => {
  return (
    <div className="w-full bg-base-100 overflow-x-hidden">
        <TopBar/>
        <Navbar/>
        <BreadCrumbs/>
        {children}
        <Footer/>
    </div>
  );
};

export default RootLayout;
