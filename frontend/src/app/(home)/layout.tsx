import { ReactNode } from 'react';
import Banner from './homePageComponent/Banner';
import Navbar from './homePageComponent/Navbar';
import TopBar from './homePageComponent/TopBar';
import Footer from '../appComoponent/Footer';


interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {

  return (
    <div className="w-full bg-base-100">
      <TopBar />
      <Navbar />
      <Banner />
      
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;
