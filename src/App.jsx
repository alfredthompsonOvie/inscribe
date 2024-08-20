import {lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { BooksProvider } from "./context/BooksContext";
import ScrollToTop from "./components/ScrollToTop";
import Spinner from "./components/loader/Spinner";

const Home = lazy(() => import("./pages/Home"));
const BooksListing = lazy(() => import("./pages/BooksListing"));
const BookDetail = lazy(() => import("./pages/BookDetail"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Cart = lazy(() => import("./pages/Cart"));
const Layout = lazy(() => import("./pages/Layout"));


function App() {
	return (
		<BooksProvider>
			<BrowserRouter>
				<Suspense fallback={<Spinner />}>
				<ScrollToTop />
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="books" element={<BooksListing />} />
						<Route path="books/:id" element={<BookDetail />} />
						<Route path="checkout" element={<Checkout />} />
						<Route path="wishlist" element={<Wishlist />} />
						<Route path="cart" element={<Cart />} />
					</Route>
				</Routes>
				</Suspense>
			</BrowserRouter>
		</BooksProvider>
	);
}

export default App;
