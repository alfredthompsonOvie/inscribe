/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";

const BooksContext = createContext();

const initialState = {
	books: [],
	isLoading: false,
	error: "",
	wishlist: [],
	cart: [],
};

function reducer(state, action) {
	switch (action.type) {
		case "loading":
			return { ...state, isLoading: true };
		case "books/loaded":
			return { ...state, isLoading: false, books: action.payload };
		case "wishlist/updated":
			return {
				...state,
				isLoading: false,
				wishlist: [...state.wishlist, action.payload],
			};
		case "wishlist/deleted":
			return {
				...state,
				isLoading: false,
				wishlist: action.payload,
			};
		case "cart/added":
			return {
				...state,
				isLoading: false,
				cart: [...state.cart, action.payload],
			};
		case "cart/updated":
			return {
				...state,
				isLoading: false,
				cart: action.payload,
			};
			case "cart/deleted":
				return {
					...state,
					isLoading: false,
					cart: action.payload,
				};
			case "cart/reset":
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
		console.log(data)
		const isInWishlist = wishlist?.some((book) => book.id === data.id);
		console.log("updated wishlist", isInWishlist, data, wishlist);
		if (isInWishlist) return;

		dispatch({ type: "wishlist/updated", payload: data });
	}
	function removeWishlist(id) {
		const newWishlist = wishlist.filter(book => book.id !== id)

		dispatch({ type: "wishlist/deleted", payload: newWishlist });
	}
	function addToCart(data) {
		const isInCart = cart.some(book => book.id === data.id);

		console.log("is in cart", isInCart)
		
		if (!isInCart) { 
			console.log("added to cart", isInCart)
			
			dispatch({ type: "cart/added", payload: data });
			return;
		}
		console.log("already in cart", isInCart)
	}
	function updateCart(data) {
		let updatedCart;
		
		const isInCart = cart.some(book => book.id === data.id);
		console.log("updateCart=> is in cart", isInCart, data, cart)
		
		if (isInCart) {
			updatedCart = cart.map(book => {
				if (book.id === data.id) {
					return data;
				}
				return book;
			})
			
			console.log("updatedCart=> modified cart", updatedCart);
			dispatch({ type: "cart/updated", payload: updatedCart });

			return;
		}
		
		if (!isInCart) {
			dispatch({ type: "cart/added", payload: data });
			console.log("from updateCart adding new book => modified cart", data);

			return;
		}


		
		// console.log("is in cart", isInCart)


		// const updatedBook = cart.map(book => {
		// 	if (book.id === data.id) {
		// 		return data;
		// 	}
		// 	return book;
		// })

		console.log(updatedCart)
	
		// dispatch({ type: "cart/updated", payload: updatedBook });
	}
	// function updateCartByIdByIncrease(id) {
	// 	const updatedCart = cart.map(book => {
	// 		if (book.id === id) {
	// 			return {...book, quantity: book.quantity +1};	
	// 		}
	// 		return book;
	// 	})


	// }
	function removeCart(id) {
		const newCart = cart.filter(book => book.id !== id)
		dispatch({ type: "cart/deleted", payload: newCart });
	}
	function resetCart() {

		dispatch({ type: "cart/reset" });
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
				// updateCartByIdByIncrease,
				updateWishlist,
				removeWishlist,
				removeCart
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
