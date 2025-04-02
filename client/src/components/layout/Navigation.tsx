import { Link, useLocation } from "wouter";
import { useEffect, useState, useRef } from "react";
import {
  Menu,
  Info,
  Phone,
  HelpCircle,
  FileText,
  UserPlus,
  LogIn,
  ChevronDown,
} from "lucide-react";

const Navigation = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Close mobile menu on location change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className="bg-[var(--cms-primary-dark)] text-white">
      <div className="max-w-[900px] mx-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between">
            <button
              className="lg:hidden py-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
            >
              <Menu className="text-white w-6 h-6" />
            </button>

            <div
              className={`${
                isMobileMenuOpen ? "block" : "hidden"
              } lg:flex w-full lg:w-auto`}
            >
              <ul className="flex flex-col lg:flex-row">
                <li>
                  <Link href="/">
                    <span
                      className={`block py-3 px-4 hover:bg-[var(--cms-primary)] cursor-pointer ${
                        location === "/" ? "bg-[var(--cms-primary)]" : ""
                      }`}
                    >
                      Home
                    </span>
                  </Link>
                </li>
                <li>
                  <span
                    className={`block py-3 px-4 hover:bg-[var(--cms-primary)] cursor-pointer ${
                      location === "/about" ? "bg-[var(--cms-primary)]" : ""
                    }`}
                  >
                    <span className="flex items-center">
                      <Info className="w-4 h-4 mr-2" />
                      About ASETT
                    </span>
                  </span>
                </li>
                <li>
                  <span
                    className={`block py-3 px-4 hover:bg-[var(--cms-primary)] cursor-pointer ${
                      location === "/contact" ? "bg-[var(--cms-primary)]" : ""
                    }`}
                  >
                    <span className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact
                    </span>
                  </span>
                </li>
                <li className="relative" ref={dropdownRef}>
                  <button
                    className="block py-3 px-4 hover:bg-[var(--cms-primary)] flex items-center w-full text-left"
                    onClick={toggleDropdown}
                  >
                    <span className="flex items-center">
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Support
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </span>
                  </button>
                  <ul
                    className={`${
                      isDropdownOpen ? "block" : "hidden"
                    } absolute left-0 bg-white text-[var(--cms-dark)] shadow-md z-10 w-48 rounded-sm`}
                  >
                    <li>
                      <span className="block px-4 py-2 hover:bg-[var(--cms-gray-lighter)] cursor-pointer">
                        ASETT Glossary
                      </span>
                    </li>
                    <li>
                      <span className="block px-4 py-2 hover:bg-[var(--cms-gray-lighter)] cursor-pointer">
                        FAQ
                      </span>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="/complaints">
                    <span
                      className={`block py-3 px-4 hover:bg-[var(--cms-primary)] cursor-pointer ${
                        location === "/complaints" ||
                        location.startsWith("/complaint")
                          ? "bg-[var(--cms-primary)]"
                          : ""
                      }`}
                    >
                      <span className="flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        My Complaints
                      </span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="hidden lg:flex items-center">
              <span className="flex items-center py-3 px-4 hover:bg-[var(--cms-primary)] cursor-pointer">
                <UserPlus className="w-4 h-4 mr-2" /> Register
              </span>
              <span className="flex items-center py-3 px-4 hover:bg-[var(--cms-primary)] cursor-pointer">
                <LogIn className="w-4 h-4 mr-2" /> Login
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
