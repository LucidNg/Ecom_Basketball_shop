import { ReactNode } from 'react';
import Banner from './homePageComponent/Banner';
import Navbar from '../appComoponent/Navbar';
import TopBar from '../appComoponent/TopBar';
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
