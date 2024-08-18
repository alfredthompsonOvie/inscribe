/* eslint-disable react/prop-types */
import styles from "./Header.module.css";
import Cta from "../button/Cta";
function Header({ title, linkPath }) {
	return (
		<header className={styles.header}>
			<h1>{title}</h1>
			<Cta linkPath={linkPath} text="See More" />
		</header>
	);
}

export default Header;
