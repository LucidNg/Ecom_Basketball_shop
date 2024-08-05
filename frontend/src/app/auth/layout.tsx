import { ReactNode } from 'react';
import Footer from '../appComoponent/Footer';


interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {

  return (
    <div className="w-full bg-primary">
      {children}
      <Footer/>
    </div>
  );
};

export default RootLayout;
