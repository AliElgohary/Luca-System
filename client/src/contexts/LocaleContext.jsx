import React, { createContext, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

const initial = {
  language: "en",
  t: () => "",
};
export const LocaleContext = createContext(initial);

export const LocaleProvider = ({ children }) => {
  const { i18n } = useTranslation();

  const initiateLocale = () => {
    if (localStorage && localStorage.getItem("lang"))
      setRawLang(localStorage.getItem("lang") || "en");
  };

  const handleDirection = (dir) => {
    document.documentElement.dir = dir;
  };

  const setRawLang = (lang) => {
    const dir = lang == "ar" ? "rtl" : "ltr";
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    handleDirection(dir);
    i18n.changeLanguage(lang);
  };
  const toggleLang = () => {
    setRawLang(i18n.language == "en" ? "ar" : "en");
  };
  useEffect(() => {
    initiateLocale();
  }, []);

  return (
    <LocaleContext.Provider
      value={{ toggleLang, setRawLang, language: i18n.language, t: i18n.t }}
    >
      {children}
    </LocaleContext.Provider>
  );
};
const useLocale = () => useContext(LocaleContext);
export default useLocale;
