/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./Brand.module.css";
function Brand({mode}) {
	return (
		<Link to="/" className={`${styles.brand} ${mode==="footer" ? styles.brandFooter : ""}`}>
			Inscribe
		</Link>
	);
}

export default Brand;
