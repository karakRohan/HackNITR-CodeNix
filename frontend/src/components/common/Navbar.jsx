// components/common/Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import { User } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import gsap from "gsap";
import { useTranslation } from "react-i18next"; // ✅ KEEP ONLY ONE

// Import custom components
import Logo from "./NavbarComponents/Logo";
import CoinButton from "./NavbarComponents/CoinButton";
import NavigationLinks from "./NavbarComponents/NavigationLinks";
import UserDropdown from "./NavbarComponents/UserDropdown";
import ThemeToggle from "./NavbarComponents/ThemeToggle";

// Import logout thunk
import { logout } from "../../services/operations/authAPI";

const Navbar = () => {
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const iconButtonsRef = useRef([]);
  const navButtonsRef = useRef([]);
  const dropdownRef = useRef(null);

  // 🔴 ADDED: translation hook
  const { t, i18n } = useTranslation();

  // 🔴 ADDED: language change function
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const isAuthenticated = !!token;

  const themeStyles = {
    navbarBg: isDarkMode ? 'bg-gray-800/30' : 'bg-white/30',
    buttonContainer: isDarkMode ? 'bg-gray-700/30' : 'bg-white/30',
    buttonBg: isDarkMode ? 'bg-gray-700' : 'bg-[#F9FAFB]',
    buttonBorder: isDarkMode ? 'border-gray-600' : 'border-gray-300',
    buttonText: isDarkMode ? 'text-gray-200' : 'text-gray-600',
    buttonHover: isDarkMode
      ? 'hover:bg-gray-600 hover:border-gray-500'
      : 'hover:bg-[#eff8d8] hover:border-[#08DF73]'
  };

  const addToIconButtonsRefs = (el, index) => {
    if (el) iconButtonsRef.current[index] = el;
  };

  const addToNavButtonsRefs = (el, index) => {
    if (el) navButtonsRef.current[index] = el;
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
    setIsDropdownOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsDropdownOpen(false);
  };

  return (
    <header ref={navbarRef} className="fixed top-[10px] left-0 right-0 z-50">
      <div className="max-w-full mx-auto px-9">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Logo logoRef={logoRef} />

          {/* Center navigation */}
          <NavigationLinks addToNavButtonsRefs={addToNavButtonsRefs} />

          {/* 🔴 RIGHT SIDE CONTAINER (THIS IS WHERE YOU ADD LANGUAGE) */}
          <div
            className={`flex items-center space-x-2 ${themeStyles.buttonContainer} backdrop-blur-sm px-2 py-[0.4rem] rounded-full`}
          >
            {/* 🔴 ADDED: Language Switcher */}
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-transparent border border-gray-300 dark:border-gray-600 text-sm rounded-full px-3 py-1 cursor-pointer"
            >
              <option value="en">EN</option>
              <option value="hi">HI</option>
              <option value="bn">BN</option>
            </select>

            {/* Theme Toggle */}
            <ThemeToggle addToIconButtonsRefs={addToIconButtonsRefs} index={0} />

            {isAuthenticated ? (
              <>
                <CoinButton addToIconButtonsRefs={addToIconButtonsRefs} />

                <div className="relative" ref={dropdownRef}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`${themeStyles.buttonBg} w-10 h-10 rounded-full flex items-center justify-center`}
                  >
                    <User className={`w-5 h-5 ${themeStyles.buttonText}`} />
                  </motion.button>

                  <UserDropdown
                    isOpen={isDropdownOpen}
                    user={user}
                    handleNavigation={handleNavigation}
                    handleLogout={handleLogout}
                  />
                </div>
              </>
            ) : (
              <>
                {/* 🟡 UPDATED: translated text */}
                <motion.button
                  onClick={() => handleNavigation("/signup")}
                  className={`${themeStyles.buttonBg} px-4 py-2 rounded-full text-sm`}
                >
                  {t("signup")}
                </motion.button>

                <motion.button
                  onClick={() => handleNavigation("/login")}
                  className="bg-green-500 px-4 py-2 rounded-full text-sm text-white"
                >
                  {t("login")}
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
