import { ReactNode } from "react";
import Footer from "../appComoponent/Footer";
import TopBar from "../appComoponent/TopBar";
import { OrdersProvider } from "../appComoponent/OrdersContext";

interface ProductPageLayout {
  children: ReactNode;
}

const RootLayout = async ({ children }: ProductPageLayout) => {
  return (
    <div className="w-full bg-base-100 overflow-x-hidden">
      <TopBar />
      <OrdersProvider>{children}</OrdersProvider>
      {/* <Footer /> */}
    </div>
  );
};

export default RootLayout;
