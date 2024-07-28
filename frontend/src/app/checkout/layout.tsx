import { ReactNode } from 'react';
import Footer from '../appComoponent/Footer';
import TopBar from '../appComoponent/TopBar';

interface ProductPageLayout {
  children: ReactNode;
}

const RootLayout = async ({ children }: ProductPageLayout) => {
  return (
    <div className="w-full bg-base-100 overflow-x-hidden">
      <TopBar />
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;
