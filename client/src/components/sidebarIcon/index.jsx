import { Link } from "react-router-dom";
import styles from "./sidebarIcon.module.css";
const SidebarIcon = ({ Icon, label, link }) => {
  return (
    <>
      <Link to={link} className={styles.sidebar_icon + " group"}>
        <div>
          <Icon size="25" />
          <span className={styles.sidebar_tooltip + " group-hover:scale-100"}>
            {label}
          </span>
        </div>
      </Link>
      <div className={styles.sidebar_hr}></div>
    </>
  );
};

export default SidebarIcon;
