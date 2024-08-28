/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import BookCard from "../../books/BookCard";
import Spinner from "../../loader/Spinner";
import Message from "../../message/Message";
import styles from "./Listings.module.css";

function Listings({getBooksByStockType, filteredBooks, isLoading}) {

	const [searchParams] = useSearchParams();
	const [layout, setLayout] = useState("grid");
	const [stockType, setStockType] = useState("default");

	const handleChange = (event) => {
		const stockTypeQuery = event.target.value;
		// sets the stock type of the selected stock locally
		setStockType(stockTypeQuery);

		// calls this function from the parent
		getBooksByStockType(stockTypeQuery);
	};


	useEffect(() => {
		const stock = searchParams.get("stock");
		if (stock) { 
			setStockType(stock);
		}
	}, [searchParams]);

	if (isLoading) return <Spinner />;

	if (filteredBooks.length === 0) return <Message text="Sorry no books found, select all Genre to view all books" page="books"/>

	return (
		<section className={styles.container}>
			<header className={styles.header}>
				<section>
					<h1>Sort by</h1>
					<label htmlFor="stockType"></label>
					<select
						name="stockType"
						id="stockType"
						value={stockType}
						onChange={handleChange}
					>
						<option value="all">All Books</option>
						<option value="dailyDeal">Daily Deals</option>
						<option value="onSale">Onsales</option>
						<option value="trending">Trending</option>
						<option value="bestseller">Bestseller</option>
						<option value="newArrival">New Arrivals</option>
					</select>
				</section>

				<ul>
					<li>
						<button onClick={() => setLayout("grid")} className={layout === "grid" ? styles.btnActive : ""}>
							<BsFillGrid3X3GapFill />
						</button>
					</li>
					<li>
						<button onClick={() => setLayout("list")} className={layout === "list" ? styles.btnActive : ""}>
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
