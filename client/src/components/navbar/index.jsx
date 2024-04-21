import { GiClothes } from "react-icons/gi";
import { MdOutlineDarkMode } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { BsTranslate } from "react-icons/bs";
import useLocale from "../../contexts/LocaleContext";
import styles from "./style.module.css";
const Navbar = () => {
  const { toggleLang, t } = useLocale();
  return (
    <div className={styles.top_nav}>
      <div className={styles.logo}>
        <GiClothes size="35" className={styles.title_hash_tag} />
        <h1 className={styles.title_text}>{t("title")}</h1>
      </div>
      <div className={styles.icons}>
        <MdOutlineDarkMode size="35" className={styles.nav_icon} />
        <FiSettings size="30" className={styles.nav_icon} />
        <BsTranslate
          onClick={toggleLang}
          size="30"
          className={`${styles.nav_icon} me-10 ms-5`}
        />
      </div>
    </div>
  );
};

export default Navbar;
