import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./button";
import safarnamaLogo from "../../../public/other/logo.png";

// NavbarProps interface define karein
interface NavbarProps {
  onBookNowClick: () => void; // Naya prop for scrolling
}

const Navbar: React.FC<NavbarProps> = ({ onBookNowClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Help", path: "/help" },
  ];

  const isActive = (path: string) => location.pathname === path; // path type specified

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Name */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={safarnamaLogo}
              alt="Safarnama Logo"
              className="h-9 w-auto"
            />
            {/* Split "Safarnama" for different colors */}
            <div className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-[#f39c12] to-[#b85c38] bg-clip-text text-transparent">
                SAFAR
              </span>
              <span className="bg-gradient-to-r from-[#f39c12] to-[#e67e22] bg-clip-text text-transparent">
                NAMA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-[#2c3e50] bg-gray-200"
                      : "text-gray-700 hover:text-[#b85c38] hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          {/* <div className="hidden md:block">
            <Button
              className="bg-[#b85c38] hover:bg-[#a15031] text-white"
              size="sm"
              onClick={onBookNowClick} // onBookNowClick prop use kiya
            >
              Book NOW!
            </Button>
          </div> */}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#f39c12]"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? "text-[#2c3e50] bg-gray-200"
                    : "text-gray-700 hover:text-[#b85c38] hover:bg-gray-100"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              {/* <Button
                className="w-full bg-[#b85c38] hover:bg-[#a15031] text-white"
                size="sm"
                onClick={() => {
                  // onBookNowClick prop use kiya for mobile button
                  onBookNowClick();
                  setIsMenuOpen(false); // Mobile menu close karein after click
                }}
              >
                Book Now
              </Button> */}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
