import { useBooks } from "../context/BooksContext";
import Hero from "../components/homepage/hero/Hero";
import BookShelf from "../components/shelf/BookShelf";
import Genre from "../components/category/Genre";
import SpecialOffer from "../components/specialOfferForm/SpecialOffer";
import Spinner from "../components/loader/Spinner";

function Home() {
	const { books, isLoading } = useBooks();

	if (isLoading) return <Spinner />;

	const dailyDeals = books?.filter((book) => book.dailyDeal);
	const newArrivals = books?.filter((book) => book.newArrival);
	const onSale = books?.filter((book) => book.onSale);
	const trending = books?.filter((book) => book.trending);
	const bestseller = books?.filter((book) => book.bestseller);
	// console.log(books, isLoading);

	return (
		<main>
			<Hero />

			{/* Daily Deal */}
			<BookShelf title="Daily Deals" linkPath="/books" books={dailyDeals} />

			{/* category */}
			<Genre />

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
