import { ReactNode } from 'react';
import TopBar from '../appComoponent/TopBar';
import Footer from '../appComoponent/Footer';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {

  return (
    <div className="w-full bg-base-100">
      <TopBar />
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;
