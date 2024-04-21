import { motion } from "framer-motion";
import Backdrop from "../backdrop/index";
import styles from "./Modal.module.css";
const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = ({ handleClose, children, title }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={styles.modal}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="w-fit mx-auto">
          <h3 className="text-white font-bold text-3xl mb-3">{title}</h3>
          <div className="bg-gray-400 mb-7 h-0.5"></div>
        </div>
        {children}
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
