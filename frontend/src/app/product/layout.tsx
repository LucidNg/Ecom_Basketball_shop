import { ReactNode } from 'react';
import Footer from '../appComoponent/Footer';
import Navbar from '../(home)/homePageComponent/Navbar';
import TopBar from '../(home)/homePageComponent/TopBar';

interface ProductPageLayout {
  children: ReactNode;
}

const RootLayout = async ({ children }: ProductPageLayout) => {

  return (
    <div className="w-full bg-base-100">
        <TopBar/>
        <Navbar/>
        {children}
        <Footer/>
    </div>
  );
};

export default RootLayout;
