import Banner from "./homePageComponent/Banner";
import Navbar from "./homePageComponent/Navbar";
import TopBar from "./homePageComponent/TopBar";



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