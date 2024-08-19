/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./Message.module.css";
function Message({ text, page}) {
	return (
		<section className={`${styles.message} ${page === "books" ? styles.booksPage: ""}`}>
      <p>{ text }</p>
			{page !== "books" && <Link to="/books" className={`${styles.btn} ${styles.btnLink}`}>
				Start Shopping
			</Link>}
		</section>
	);
}

export default Message;
