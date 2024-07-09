import { ReactNode } from 'react';
import Banner from './homePageComponent/Banner';
import Navbar from './homePageComponent/Navbar';
import TopBar from './homePageComponent/TopBar';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  

  return (
    <div className="w-screen bg-base-100">
      <TopBar />
      <Navbar />
      <Banner />
      
      {children}
    </div>
  );
};

export default RootLayout;
