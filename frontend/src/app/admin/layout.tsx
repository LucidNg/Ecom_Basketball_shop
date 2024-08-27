import { ReactNode } from 'react';
import SideBar from './adminComponents/sidebar';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {

  return (
    <div className="w-full bg-base-100 flex">
        <SideBar/>
        {children}
    </div>
  );
};

export default RootLayout;
