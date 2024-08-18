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
		const category = searchParams.get("genre");
		const searchTerm = searchParams.get("query");

		if (searchTerm) {
			const searched = books.filter((book) =>
				book.title.toLowerCase().includes(searchTerm.toLowerCase())
			);

			// console.log(searched);
			setFilteredBooks(searched);
			return;
		}

		if (sortBy === "default") {
			setFilteredBooks(books);
			return;
		}
		if (sortBy && sortBy !== "default") { 
			// console.log("sort by not ===  default")
			// console.log(sortBy)
			const sortedBooks = books
				?.filter((book) => book.categories.includes(sortBy));
	
				setFilteredBooks(sortedBooks)
		}



	}, [searchParams, books, sortBy]);

	// useEffect(() => {
	// 	const category = searchParams.get('genre');
	// 	const query = searchParams.get('query');

	// 	const searched = books.filter(book => book.title.toLowerCase().includes(query.toLowerCase()));

	// 	// if (query) {
	// 	// 	setFilteredBooks(searched);
	//   //   return;
	// 	// }

	// 	// console.log(searched)
	// 	console.log(category, query)
	// }, [searchParams, books]);

	// useEffect(() => {
	// 	// console.log(sortBy)
	// 	if (sortBy === "default") {
	// 		setFilteredBooks(books);
	// 		return;
	// 	}

	// 	const sortedBooks = books
	// 		?.filter((book) => book.categories.includes(sortBy));

	// 		setFilteredBooks(sortedBooks)

	// }, [sortBy, books]);

	return (
		<main className={styles.container}>
			<Sidebar categories={categories} setSortBy={setSortBy} />
			<Listings
				getFilteredBooks={getFilteredBooks}
				filteredBooks={filteredBooks}
			/>
		</main>
	);
}

export default BooksListing;
