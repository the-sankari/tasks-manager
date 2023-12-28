import { useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import SideNavbar from "./SideNavbar";

const HeaderNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial window width on component mount
    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenuButton = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex items-center justify-between shadow-md px-4 h-20 sm:px-8 bg-rose-700 text-white fixed top-0 w-full z-30">
      <div className="flex items-center z-50">
        {windowWidth <= 767 && (
          <button
            className="btn btn-ghost lg:hidden"
            onClick={handleMenuButton}
          >
            <BiMenu className="w-6 h-6" />
          </button>
        )}
        <a href="/" className="text-2xl font-bold mx-4">
          Tasks Manager
        </a>
      </div>
      <div
        className={`fixed left-0 -top-4 h-full bg-transparent z-20 transition-all duration-1000 ease-in
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ width: "225px", marginTop: "1rem" }} // Adjust marginTop to position below the header
      >
        <SideNavbar />
      </div>
    </div>
  );
};

export default HeaderNav;
