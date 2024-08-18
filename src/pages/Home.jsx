import { useBooks } from "../context/BooksContext";
import Hero from "../components/homepage/hero/Hero";
import BookShelf from "../components/shelf/BookShelf";
import Genre from "../components/genre/Genre";
import SpecialOffer from "../components/specialOfferForm/SpecialOffer";
import Spinner from "../components/loader/Spinner";

function Home() {
	const { books, isLoading } = useBooks();

	if (isLoading) return <Spinner />;

	// ! get four books from each stock
	const dailyDeals = books?.filter((book) => book.dailyDeal).slice(0,4);
	const newArrivals = books?.filter((book) => book.newArrival).slice(0,4);
	const onSale = books?.filter((book) => book.onSale).slice(0,4);
	const trending = books?.filter((book) => book.trending).slice(0,4);
	const bestseller = books?.filter((book) => book.bestseller).slice(0, 4);
	
	// ! get the first five genre
	const genre = books?.reduce((arr, book) => {
		book.categories.forEach((category) => {
			if (!arr.includes(category)) arr.push(category);
		});

		return arr;
	}, []).slice(0,5);


	return (
		<main>
			<Hero />

			{/* Daily Deal */}
			<BookShelf title="Daily Deals" linkPath="/books" books={dailyDeals} />

			{/* category */}
			<Genre genre={genre} />

			{/* New Arrivals*/}
			<BookShelf title="New Arrivals" linkPath="/books" books={newArrivals} />

			{/* On Sale */}
			<BookShelf title="On Sale" linkPath="/books" books={onSale} />

			{/* trending books */}
			<BookShelf
				title="Trending on Inscribe"
				linkPath="/books"
				books={trending}
			/>

			{/* bestseller */}
			<BookShelf title="Best Seller" linkPath="/books" books={bestseller} />

			{/* subscribe */}
			<SpecialOffer />
		</main>
	);
}

export default Home;
