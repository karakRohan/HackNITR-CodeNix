import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      home: "Home",
      services: "Services",
      shop: "Shop",
      community: "Community",
      about: "About",
      pharmacy: "Pharmacy",
      contact: "Contact",

      login: "Login",
      signup: "Sign Up",

      welcome: "Welcome to EcoCollect",
      tagline: "A smarter way to manage waste and recycling",

      bookPickup: "Book Pickup",
      learnMore: "Learn More",

      loading: "Loading...",
      submit: "Submit"
    }
  },

  hi: {
    translation: {
      home: "होम",
      services: "सेवाएं",
      shop: "दुकान",
      community: "समुदाय",
      about: "हमारे बारे में",
      pharmacy: "फार्मेसी",
      contact: "संपर्क",

      login: "लॉगिन",
      signup: "साइन अप",

      welcome: "EcoCollect में आपका स्वागत है",
      tagline: "कचरा और रीसाइक्लिंग का स्मार्ट तरीका",

      bookPickup: "पिकअप बुक करें",
      learnMore: "और जानें",

      loading: "लोड हो रहा है...",
      submit: "जमा करें"
    }
  },

  bn: {
    translation: {
      home: "হোম",
      services: "পরিষেবা",
      shop: "দোকান",
      community: "কমিউনিটি",
      about: "আমাদের সম্পর্কে",
      pharmacy: "ফার্মেসি",
      contact: "যোগাযোগ",

      login: "লগইন",
      signup: "সাইন আপ",

      welcome: "EcoCollect-এ আপনাকে স্বাগতম",
      tagline: "বর্জ্য ব্যবস্থাপনার স্মার্ট উপায়",

      bookPickup: "পিকআপ বুক করুন",
      learnMore: "আরও জানুন",

      loading: "লোড হচ্ছে...",
      submit: "জমা দিন"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("language") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
