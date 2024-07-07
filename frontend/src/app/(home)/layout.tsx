import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";



export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="w-screen">
        <TopBar/>
        <Navbar/>
        {children}
      </div>
    );
  }