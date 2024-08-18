/* eslint-disable react/prop-types */
import styles from "./Button.module.css";

function Button({ fn, children }) {
  function handleClick() {
    fn()
  }
	return <button className={styles.btn} onClick={handleClick}>{children}</button>;
}

export default Button;
