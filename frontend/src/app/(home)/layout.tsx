<<<<<<< Updated upstream
import Banner from "./homePageComponent/Banner";
import Navbar from "./homePageComponent/Navbar";
import TopBar from "./homePageComponent/TopBar";
=======
import { ReactNode } from 'react';
import Banner from './homePageComponent/Banner';
import Navbar from './homePageComponent/Navbar';
import TopBar from './homePageComponent/TopBar';
import Footer from '../appComoponent/Footer';
>>>>>>> Stashed changes



<<<<<<< Updated upstream
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="w-full bg-base-100">
        <TopBar/>
        <Navbar/>
        <Banner/>
        {children}
      </div>
    );
  }
=======
  return (
    <div className="w-full bg-base-100">
      <TopBar />
      <Navbar />
      <Banner />
      {children}
      <Footer/>
    </div>
  );
};

export default RootLayout;
>>>>>>> Stashed changes
