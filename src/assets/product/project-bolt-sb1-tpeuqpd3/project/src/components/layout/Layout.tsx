import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileNavbar from './MobileNavbar';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pb-20 md:pb-0">
        <Outlet />
      </main>
      <MobileNavbar className="md:hidden" />
      <Footer className="hidden md:block" />
    </div>
  );
};

export default Layout;