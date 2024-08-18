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
	const {wishlist, cart} = useBooks();
	let location = useLocation();
	const [isOpen, setIsOpen] = useState(false);
	const [isWishlistOpen, setIsWishlistOpen] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [showSearch, setShowSearch] = useState(false);

	const numberOfBooksInCart = cart.length;
	const numberOfBooksInWishlist = wishlist.length;

	const { register, handleSubmit, reset } =	useForm()
	const navigate = useNavigate()

	function onSubmit(data) {

		// ?category=fiction&sort=popular
		navigate(`/books?genre=${data.genre}&query=${data.search}`)
		setShowSearch(false)
		reset();
	}

	// function toggleMenu() {
	// 	setIsOpen((isOpen) => !isOpen);
	// }

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

	// useEffect(() => {
	// 	window.addEventListener("resize", () =>
	// 		setIsMobile(window.innerWidth < SCREEN_SIZE)
	// 	);
	// }, []);

	return (
		<nav className={`${styles.nav} ${mode ? "fixedNav" : ""}`}>
			<section className={styles.navContents}>
				<Brand />

				<NavLink className={styles.navlink} to="/books">
					books
				</NavLink>

				<section className={`${styles.searchContainer} ${showSearch? styles.showSearch: ""}`}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<section className={styles.select} {...register("genre")}>
							<select name="category" id="category">
								<option value="default">Category</option>
								<option value="Fiction">Fiction</option>
								<option value="Thriller">Thriller</option>
								<option value="Horror">Horror</option>
								<option value="Mystery">Mystery</option>
								<option value="Philosophy">Philosophy</option>
								<option value="Spirituality">Spirituality</option>
								<option value="Dystopian">Dystopian</option>
								<option value="Literary">Literary</option>
								<option value="Adventure">Adventure</option>
								<option value="Fantasy">Fantasy</option>
								<option value="Young Adult">Young Adult</option>
								<option value="Non-Fiction">Non-Fiction</option>
								<option value="Self-Help">Self-Help</option>
								<option value="Philosophy">Philosophy</option>
								<option value="Classics">Classics</option>
								<option value="Science Fiction">Science Fiction</option>
								<option value="Memoir">Memoir</option>
								<option value="Inspirational">Inspirational</option>
								<option value="Productivity">Productivity</option>
								<option value="Romance">Romance</option>
								<option value="History">History</option>
								<option value="Science">Science</option>
								<option value="Historical">Historical</option>
							</select>
						</section>
						<section className={styles.formGroup}>
							<label htmlFor="search"></label>
							<input
								type="search"
								id="search"
								placeholder="Search entire store here"
								{...register("search", {required: true})}
							/>
						</section>

						<button>
							<BiSearch />
						</button>
					</form>
				</section>

				<section className={styles.buttonsContainer}>
					<button onClick={() => setShowSearch(!showSearch)} className={styles.searchBtn}>
						{!showSearch ? <BiSearch /> :
						<IoCloseCircle />}
					</button>

					<button onClick={() => setIsWishlistOpen(!isWishlistOpen)}>
						<IoMdHeart />
						{numberOfBooksInWishlist !== 0 && <span>{numberOfBooksInWishlist }</span>}

					</button>

					<button onClick={() => setIsCartOpen(!isCartOpen)}>
						<IoCartOutline />
						{numberOfBooksInCart !== 0 && <span>{numberOfBooksInCart }</span>}
					</button>

				</section>
			</section>


			{/* wishlist */}
			{isWishlistOpen && (
				<Modal onCloseModal={setIsWishlistOpen} title="Your Wishlist" linkPath="/wishlist" LinkText="view all Wishlist" books={wishlist} />
			)}
			{/* cart */}
			{isCartOpen && <Modal onCloseModal={setIsCartOpen} title="cart" linkPath="/cart" LinkText="View Cart" books={cart} />}
		</nav>
	);
}

export default Navbar;
