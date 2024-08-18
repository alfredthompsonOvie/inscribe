/* eslint-disable react/prop-types */
import BookCard from "../books/BookCard";
import Header from "../sectionHeader/Header";
import styles from "./BookShelf.module.css";
function BookShelf({ title, linkPath, books=[] }) {
	// console.log(books);

	if (!books.length) return <p>	loading </p>

	return (
		<section className={styles.container}>
			<section className={styles.contents}>
				<Header title={title} linkPath={linkPath} />
				<section className={styles.bookContainer}>
					{books.map((book, idx) => <BookCard key={idx} srcPath={book.image} layout="grid" book={book} />)}
          
          {/* <BookCard srcPath="/images/alchemist.jpeg" layout="grid"/>
          <BookCard srcPath="/images/1984.jpeg" layout="grid"/> */}
				</section>
			</section>
		</section>
	);
}

export default BookShelf;
