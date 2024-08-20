import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useBooks } from "../context/BooksContext";
import Listings from "../components/booksListingPage/listing/Listings";
import Sidebar from "../components/booksListingPage/sidebar/Sidebar";
import styles from "./BooksListing.module.css";

function BooksListing() {
	const [searchParams, setSearchParams] = useSearchParams();
	const { books, isLoading } = useBooks();
	const [filteredBooks, setFilteredBooks] = useState([]);


	// ! get all genre from books, no duplicates
	const categories = books?.reduce((arr, book) => {
		book.categories.forEach((category) => {
			if (!arr.includes(category)) arr.push(category);
		});
		return arr;
	}, []);

	// ! sortBy filter
	// getBooksByStockType
	function getBooksByStockType(query) {
		setSearchParams(`sortBy-stock=${query}`);
		if (query === "all") {
			setFilteredBooks(books);
			return;
		}
		const sorted = books?.filter((book) => book[query]);
		setFilteredBooks(sorted);
	}

	// ! genre filter
	// findBooksByGenre
	// for sidebar
	function findBooksByGenre(genre) {
		setSearchParams(`sortBy-category=${genre}`);

		if (genre === 'all') { 
			setFilteredBooks(books);
			return;
		}

		const sortedBooks = books?.filter((book) =>
			book.categories.includes(genre)
		);

		setFilteredBooks(sortedBooks);

		return;
	}

	useEffect(() => {
		const stock = searchParams.get("stock");
		const searchTerm = searchParams.get("query");
		const genre = searchParams.get("genre");
		const genreHome = searchParams.get("genre_1");

		// navigating from homepage "onSale||dailyDeals||trending||newArrival||bestseller"
		if (stock) {
			console.log(stock, "from sortBy");
			const searched = books.filter((book) => book[stock]);
			setFilteredBooks(searched);
			return;
		}

		if (searchTerm && genre) {
			const searched = books.filter((book) =>
				book.title.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setFilteredBooks(searched);

			return;
		}

		if (genreHome) { 
			console.log(genreHome);
			const sortedBooks = books?.filter((book) =>
				book.categories.includes(genreHome)
			);
	
			setFilteredBooks(sortedBooks);
			return;
		}

		if (searchParams.size === 0) {
			setFilteredBooks(books);
			return;
		}

	}, [searchParams, books]);

	return (
		<main className={styles.container}>
			<Sidebar
				categories={categories}
				findBooksByGenre={findBooksByGenre}
			/>
			<Listings
				getBooksByStockType={getBooksByStockType}
				filteredBooks={filteredBooks}
				isLoading={isLoading}
			/>
		</main>
	);
}

export default BooksListing;
