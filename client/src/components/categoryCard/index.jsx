import IconByName from "../common/IconByName";
import styles from "./categoryCard.module.css";
import { motion } from "framer-motion";

const categoryCard = ({ iconName, title, itemsCount }) => {
  return (
    <motion.div className={styles.card} whileHover={{ scale: 1.04 }}>
      <IconByName
        className={styles.icon}
        name={iconName}
        size={70}
        color="#e2e2e2"
      />
      <p className={styles.title}>{title}</p>
      <span className={styles.count}>{itemsCount} items</span>
    </motion.div>
  );
};

export default categoryCard;
