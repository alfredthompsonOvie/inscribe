/* eslint-disable react/prop-types */

import { useBooks } from "../../context/BooksContext";
import BookShelf from "../shelf/BookShelf";
import styles from "./RelatedBooks.module.css";

function RelatedBooks({ searchId }) {
	const { books } = useBooks();
	const foundBook = books?.find((b) => b.id === parseInt(searchId)).categories;

	const relatedBook = books
		?.filter((book) => book.categories.some((b) => foundBook.includes(b)))
		.filter((book) => book.rating > 4.7);

	return (
		<section className={styles.relatedItems}>
			<BookShelf
				title="Customers also viewed"
				linkPath="/books"
				books={relatedBook}
			/>
		</section>
	);
}

export default RelatedBooks;
