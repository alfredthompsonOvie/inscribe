/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { IoCartOutline } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { BiSearch } from "react-icons/bi";

import Brand from "../links/brand/Brand";

import styles from "./Navbar.module.css";
import Modal from "../modal/Modal";
import { useBooks } from "../../context/BooksContext";
import { IoCloseCircle } from "react-icons/io5";
import { useForm } from "react-hook-form";

function Navbar({ mode }) {
	const { wishlist, cart, books } = useBooks();
	let location = useLocation();
	const [isOpen, setIsOpen] = useState(false);
	const [isWishlistOpen, setIsWishlistOpen] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [showSearch, setShowSearch] = useState(false);

	const categories = books?.reduce((arr, book) => {
		book.categories.forEach((category) => {
			if (!arr.includes(category)) arr.push(category);
		});
		return arr;
	}, []);

	const numberOfBooksInCart = cart.length;
	const numberOfBooksInWishlist = wishlist.length;

	const { register, handleSubmit, reset } = useForm();
	const navigate = useNavigate();

	function onSubmit(data) {
		// ?category=fiction&sort=popular
		navigate(`/books?genre=${data.genre}&query=${data.search}`);
		setShowSearch(false);
		reset();
	}

	useEffect(() => {
		if (location.pathname) setIsOpen(false);
	}, [location.pathname]);

	useEffect(() => {
		const handleResize = () => {
			setIsOpen(false);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [isOpen]);

	return (
		<nav className={`${styles.nav} ${mode ? "fixedNav" : ""}`}>
			<section className={styles.navContents}>
				<Brand />

				<NavLink className={styles.navlink} to="/books">
					books
				</NavLink>

				<section
					className={`${styles.searchContainer} ${
						showSearch ? styles.showSearch : ""
					}`}
				>
					<form onSubmit={handleSubmit(onSubmit)}>
						<section className={styles.select} {...register("genre")}>
							<select name="category" id="category">
								<option value="default" key="default">
									Category
								</option>

								{categories.map((genre, idx) => (
									<option key={idx} value={genre}>
										{genre}
									</option>
								))}
							</select>
						</section>
						<section className={styles.formGroup}>
							<label htmlFor="search"></label>
							<input
								type="search"
								id="search"
								placeholder="Search entire store here"
								{...register("search", { required: true })}
							/>
						</section>

						<button>
							<BiSearch />
						</button>
					</form>
				</section>

				<section className={styles.buttonsContainer}>
					<button
						onClick={() => setShowSearch(!showSearch)}
						className={styles.searchBtn}
					>
						{!showSearch ? <BiSearch /> : <IoCloseCircle />}
					</button>

					<button onClick={() => setIsWishlistOpen(!isWishlistOpen)}>
						<IoMdHeart />
						{numberOfBooksInWishlist !== 0 && (
							<span>{numberOfBooksInWishlist}</span>
						)}
					</button>

					<button onClick={() => setIsCartOpen(!isCartOpen)}>
						<IoCartOutline />
						{numberOfBooksInCart !== 0 && <span>{numberOfBooksInCart}</span>}
					</button>
				</section>
			</section>

			{/* wishlist */}
			{isWishlistOpen && (
				<Modal
					onCloseModal={setIsWishlistOpen}
					title="Your Wishlist"
					linkPath="/wishlist"
					LinkText="view all Wishlist"
					books={wishlist}
				/>
			)}
			{/* cart */}
			{isCartOpen && (
				<Modal
					onCloseModal={setIsCartOpen}
					title="cart"
					linkPath="/cart"
					LinkText="View Cart"
					books={cart}
				/>
			)}
		</nav>
	);
}

export default Navbar;
