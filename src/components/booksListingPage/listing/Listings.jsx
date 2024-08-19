/* eslint-disable react/prop-types */
import { useState } from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import BookCard from "../../books/BookCard";
import Spinner from "../../loader/Spinner";
import styles from "./Listings.module.css";
import Message from "../../message/Message";

function Listings({getFilteredBooks, filteredBooks, isLoading}) {

	const [layout, setLayout] = useState("grid");
	const [sortBy, setSortBy] = useState("default");

	const handleChange = (event) => {
		const query = event.target.value;
		setSortBy(query);
		getFilteredBooks(query);
	};


	if (isLoading) return <Spinner />;

	if (filteredBooks.length === 0) return <Message text="Sorry no books found, select all Genre to view all books" page="books"/>
	// if(filteredBooks.length === 0) return <p className={styles.container}>Sorry no books found</p>

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

			</section>
		</section>
	);
}

export default Listings;
