import { GoHome } from "react-icons/go";
import { TfiReceipt } from "react-icons/tfi";
import { IoIosList } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import useLocale from "../../contexts/LocaleContext";

import styles from "./style.module.css";
import SidebarIcon from "../sidebarIcon";
import { AiOutlineSkin } from "react-icons/ai";

const Sidebar = () => {
  const { t } = useLocale();
  return (
    <div className={styles.sidebar}>
      <SidebarIcon Icon={GoHome} label={t("home")} link="/dashboard" />
      <SidebarIcon Icon={TfiReceipt} label={t("receipt")} link="/receipts" />

      <SidebarIcon
        Icon={IoIosList}
        label={t("categories")}
        link="/categories"
      />

      <SidebarIcon
        Icon={AiOutlineSkin}
        label={t("products")}
        link="/products"
      />
      <SidebarIcon
        Icon={HiUserGroup}
        label={t("customers")}
        link="/customers"
      />
      <div className={styles.logout}>
        <SidebarIcon Icon={BiLogOut} label={t("logout")} link="/logout" />
      </div>
    </div>
  );
};

export default Sidebar;
