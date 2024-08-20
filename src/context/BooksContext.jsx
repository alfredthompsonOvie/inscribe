/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";

const BooksContext = createContext();

const initialState = {
	books: [],
	isLoading: false,
	error: "",
	wishlist: JSON.parse(localStorage.getItem("wishlist"))  || [],
	cart: JSON.parse(localStorage.getItem("cart")) || [],
};

function reducer(state, action) {
	switch (action.type) {
		case "loading":
			return { ...state, isLoading: true };
		case "books/loaded":
			return { ...state, isLoading: false, books: action.payload };
		case "wishlist/updated": {
			const modifiedWishlist = [...state.wishlist, action.payload];
			localStorage.setItem("wishlist", JSON.stringify(modifiedWishlist));

			return {
				...state,
				isLoading: false,
				wishlist: modifiedWishlist,
			};
		}
		case "wishlist/deleted": {
			const modifiedWishlist = action.payload;
			localStorage.setItem("wishlist", JSON.stringify(modifiedWishlist));
			return {
				...state,
				isLoading: false,
				wishlist: modifiedWishlist,
			};
		}
		case "cart/added": {
			const modifiedCart = [...state.cart, action.payload];
			localStorage.setItem("cart", JSON.stringify(modifiedCart));
			return {
				...state,
				isLoading: false,
				cart: modifiedCart,
			};
		}
		case "cart/updated": {
			const modifiedCart = action.payload;
			localStorage.setItem("cart", JSON.stringify(modifiedCart));
			return {
				...state,
				isLoading: false,
				cart: modifiedCart,
			};
		}
		case "cart/deleted": {
			const modifiedCart = action.payload;
			localStorage.setItem("cart", JSON.stringify(modifiedCart));
			return {
				...state,
				isLoading: false,
				cart: modifiedCart,
			};
		}
		case "cart/reset":
			localStorage.removeItem("cart");
			return {
				...state,
				isLoading: false,
				cart: [],
			};

		default:
			throw new Error("Unknown action type");
	}
}

function BooksProvider({ children }) {
	const [{ books, isLoading, wishlist, cart }, dispatch] = useReducer(
		reducer,
		initialState
	);

	useEffect(() => {
		dispatch({ type: "loading" });
		async function getBooks() {
			try {
				const res = await fetch("/data/data.json");
				const data = await res.json();

				dispatch({ type: "books/loaded", payload: data });
			} catch (e) {
				console.log(e);
			}
		}
		getBooks();
	}, []);

	function updateWishlist(data) {
		const isInWishlist = wishlist?.some((book) => book.id === data.id);

		if (isInWishlist) return;

		dispatch({ type: "wishlist/updated", payload: data });
	}
	function removeWishlist(id) {
		const newWishlist = wishlist.filter((book) => book.id !== id);

		dispatch({ type: "wishlist/deleted", payload: newWishlist });
	}

	// ! CART API================================

	function addToCart(data) {
		console.log(data)
		const isInCart = cart.some((book) => book.id === data.id);

		if (!isInCart) {
			dispatch({ type: "cart/added", payload: data });
			return;
		}
	}

	function updateCart(data) {
		let updatedCart;

		const isInCart = cart.some((book) => book.id === data.id);
		console.log("updateCart=> is in cart", isInCart, data, cart);

		// ! if is in cart update cart
		if (isInCart) {
			updatedCart = cart.map((book) => {
				if (book.id === data.id) {
					return data;
				}
				return book;
			});

			console.log("updatedCart=> modified cart", updatedCart);
			dispatch({ type: "cart/updated", payload: updatedCart });

			return;
		}

		// ! if is NOT in cart then add to cart
		if (!isInCart) {
			dispatch({ type: "cart/added", payload: data });
			console.log("from updateCart adding new book => modified cart", data);

			return;
		}
	}
	function updateCartByIncreasingQuantity(id) {
		const modified = cart.map((book) => {
			if (book.id === id) {
				book.totalQuantity += 1;
				book.totalPrice = book.price * book.totalQuantity;
			}
			return book;
		});

		dispatch({ type: "cart/updated", payload: modified });
	}

	function updateCartByDecreasingQuantity(id) {
		const modified = cart.map((book) => {
			if (book.id === id && book.totalQuantity === 1) {
				console.log("quantity === 1");
				return book;
			}

			if (book.id === id && book.totalQuantity !== 1) {
				book.totalQuantity -= 1;
				book.totalPrice = book.price * book.totalQuantity;
			}
			return book;
		});

		dispatch({ type: "cart/updated", payload: modified });
	}

	function removeCart(id) {
		const newCart = cart.filter((book) => book.id !== id);
		dispatch({ type: "cart/deleted", payload: newCart });
	}
	function resetCart() {
		dispatch({ type: "cart/reset" });
	}

	// ! move items from wishlist to cart
	function moveToCart(book) {
		addToCart(book);
		removeWishlist(book.id);
	}

	return (
		<BooksContext.Provider
			value={{
				books,
				isLoading,
				wishlist,
				cart,
				addToCart,
				updateCart,
				resetCart,
				updateCartByIncreasingQuantity,
				updateCartByDecreasingQuantity,
				updateWishlist,
				removeWishlist,
				removeCart,
				moveToCart
			}}
		>
			{children}
		</BooksContext.Provider>
	);
}

function useBooks() {
	const context = useContext(BooksContext);

	if (context === undefined)
		throw new Error("Cannot access books context outside books provider");

	return context;
}

export { BooksProvider, useBooks };
