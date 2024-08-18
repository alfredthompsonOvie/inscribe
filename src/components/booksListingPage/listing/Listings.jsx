/* eslint-disable react/prop-types */
import styles from "./Listings.module.css";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import BookCard from "../../books/BookCard";
import { useEffect, useState } from "react";
import { useBooks } from "../../../context/BooksContext";

function Listings({getFilteredBooks, filteredBooks}) {
	// const { books, isLoading } = useBooks();
	// const [filteredBooks, setFilteredBooks] = useState([]);
	const [sortBy, setSortBy] = useState("default");


	const handleChange = (event) => {
		const query = event.target.value;
		setSortBy(query);
		getFilteredBooks(query);
		// console.log(query);
	};


	const [layout, setLayout] = useState("grid");

	// useEffect(() => {

	// 	console.log(filteredBooks)

	// 	// if (sortBy === "default") setFilteredBooks(books);
	// }, [filteredBooks]);

	if(filteredBooks.length === 0) return <p className={styles.container}>Sorry no books found</p>

	return (
		<section className={styles.container}>
			<header className={styles.header}>
				<section>
					<h1>Sort by</h1>
					<label htmlFor="sortBy"></label>
					<select
						name="sortBy"
						id="sortBy"
						value={sortBy}
						onChange={handleChange}
					>
						<option value="default">All Books</option>
						<option value="dailyDeal">Daily Deals</option>
						<option value="onSale">Onsales</option>
						<option value="trending">Trending</option>
						<option value="bestseller">Bestseller</option>
						<option value="newArrival">New Arrivals</option>
					</select>
				</section>

				<ul>
					<li>
						<button onClick={() => setLayout("grid")}>
							<BsFillGrid3X3GapFill />
						</button>
					</li>
					<li>
						<button onClick={() => setLayout("list")}>
							<FaList />
						</button>
					</li>
				</ul>
			</header>

			<section
				className={`${styles.listing} ${layout === "grid" ? "grid" : "list"}`}
			>
				{filteredBooks?.map((book) => (
					<BookCard key={book.id} book={book} layout={layout} />
				))}

				{/* <BookCard srcPath="/images/alchemist.jpeg" layout={layout}/>
				<BookCard srcPath="/images/1984.jpeg" layout={layout}/> */}
			</section>
		</section>
	);
}

export default Listings;
