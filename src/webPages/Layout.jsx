import { Outlet } from "react-router-dom";
import HeaderNav from "../components/HeaderNav";
import { useTheme } from "../components/Theme";

const Layout = () => {
  const { theme } = useTheme();
  return (
    <div className={` ${theme === "dark" ? "text-white" : "text-black"}`}>
      <HeaderNav />
      <main className="w-full min-h-full mt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
