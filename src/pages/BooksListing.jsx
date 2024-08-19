import { useEffect, useState } from "react";
import Listings from "../components/booksListingPage/listing/Listings";
import Sidebar from "../components/booksListingPage/sidebar/Sidebar";
import { useBooks } from "../context/BooksContext";
import styles from "./BooksListing.module.css";
import { useSearchParams } from "react-router-dom";

function BooksListing() {
	const [searchParams] = useSearchParams();
	const { books, isLoading } = useBooks();
	const [filteredBooks, setFilteredBooks] = useState([]);
	const [sortBy, setSortBy] = useState("default");

	// ! get all genre from books, no duplicates
	const categories = books?.reduce((arr, book) => {
		book.categories.forEach((category) => {
			if (!arr.includes(category)) arr.push(category);
		});
		return arr;
	}, []);

	function getFilteredBooks(query) {
		if (query === "default") {
			setFilteredBooks(books);
			return;
		}
		const sorted = books?.filter((book) => book[query]);
		console.log("getFilteredBooks", query);
		setFilteredBooks(sorted);
	}

	useEffect(() => {
		// const category = searchParams.get("genre");
		const searchTerm = searchParams.get("query");
		console.log(sortBy);

		if (searchTerm) {
			const searched = books.filter((book) =>
				book.title.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setFilteredBooks(searched);

			return;
		}

		if (sortBy === "default") {
			setFilteredBooks(books);
			return;
		}
		if ( sortBy !== "default") { 
			console.log("here")
			const sortedBooks = books	
				?.filter((book) => book.categories.includes(sortBy));
	
			setFilteredBooks(sortedBooks)
			
			return;
		}





	}, [searchParams, books, sortBy]);


	return (
		<main className={styles.container}>
			<Sidebar categories={categories} setSortBy={setSortBy} />
			<Listings
				getFilteredBooks={getFilteredBooks}
				filteredBooks={filteredBooks}
				isLoading={isLoading}
			/>
		</main>
	);
}

export default BooksListing;
