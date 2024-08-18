import styles from "./Spinner.module.css";
function Spinner() {
  return (
    <section className={styles.container}>
		<div className={styles.book}>
			<div className={styles.book__pg__shadow}></div>
			<div className={styles.book__pg}></div>
			<div className={`${styles.book__pg } ${styles.book__pg__2}`}></div>
			<div className={`${styles.book__pg } ${styles.book__pg__3}`}></div>
			<div className={`${styles.book__pg } ${styles.book__pg__4}`}></div>
			<div className={`${styles.book__pg } ${styles.book__pg__5}`}></div>
		</div>

    </section>
	);
}

export default Spinner;
