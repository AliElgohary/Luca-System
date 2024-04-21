import { GiClothes } from "react-icons/gi";
import { BsTranslate } from "react-icons/bs";
import { SlLogin } from "react-icons/sl";
import useLocale from "../../contexts/LocaleContext";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
const LandingNavbar = () => {
  const { toggleLang, t } = useLocale();
  return (
    <div className={styles.top_nav}>
      <div className={styles.logo}>
        <GiClothes size="40" className={styles.title_hash_tag} />
        <h1 className={styles.title_text}>{t("title")}</h1>
      </div>
      <div className={styles.icons}>
        <Link to="/login">
          <SlLogin size="40" className={styles.nav_icon} />
        </Link>
        <BsTranslate
          onClick={toggleLang}
          size="40"
          className={`${styles.nav_icon} me-10 ms-5`}
        />
      </div>
    </div>
  );
};

export default LandingNavbar;
