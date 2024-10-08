/* eslint-disable react/prop-types */
import BookCard from "../books/BookCard";
import Spinner from "../loader/Spinner";
import Header from "../sectionHeader/Header";
import styles from "./BookShelf.module.css";


function BookShelf({ title, linkPath, books=[] }) {


	if (!books.length) return <Spinner />;

	return (
		<section className={styles.container}>
			<section className={styles.contents}>
				<Header title={title} linkPath={linkPath} />
				<section className={styles.bookContainer}>
					{books.map((book, idx) => <BookCard key={idx} srcPath={book.image} layout="grid" book={book} />)}
				</section>
			</section>
		</section>
	);
}

export default BookShelf;
