import { Outlet } from "react-router-dom";
import SideBar from "./components/sidebar/SideBar";
const Layout = () => {
  return (
    <div className="main-layout">
      <SideBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
