// components/common/NavbarComponents/NavigationLinks.jsx
import React from "react";
import CustomNavLink from "./CustomNavLink";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const NavigationLinks = ({ addToNavButtonsRefs }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const { t } = useTranslation();

  const links = [
    { to: "/", label: t("home") },
    { to: "/services", label: t("services") },
    { to: "/shop", label: t("shop") },
    { to: "/community", label: t("community") },
    { to: "/about", label: t("about") }
  ];

  const themeStyles = {
    navBg: isDarkMode ? "bg-gray-800/30" : "bg-white/30",
    borderColor: isDarkMode ? "border-gray-600/20" : "border-white/20"
  };

  return (
    <nav
      className={`hidden md:flex items-center space-x-3 ${themeStyles.navBg} backdrop-blur-sm px-2 py-3 rounded-full transition-colors duration-300 border ${themeStyles.borderColor}`}
    >
      {links.map((link, index) => (
        <CustomNavLink
          key={link.to}
          {...link}
          addToNavButtonsRefs={addToNavButtonsRefs}
          index={index}
        />
      ))}
    </nav>
  );
};

export default NavigationLinks;
