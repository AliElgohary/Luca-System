import styles from "./Spinner.module.css";
const Spinner = ({ size = 30, customStyle , className }) => {
  return (
    <div
      className={`${styles.spinner} ${className}`}
      style={{ width: size, height: size, ...customStyle }}
    ></div>
  );
};


export default Spinner;
