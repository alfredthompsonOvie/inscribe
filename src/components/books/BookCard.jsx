/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { FaNairaSign } from "react-icons/fa6";

import { MdAddShoppingCart } from "react-icons/md";
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { TfiMoreAlt } from "react-icons/tfi";

import styles from "./BookCard.module.css";
import { useState } from "react";
import { useBooks } from "../../context/BooksContext";

function BookCard({ layout, book }) {
	const { updateWishlist, addToCart } = useBooks();
	
	//isWishlisted is a feature yet to be implemented
	const [isWishlist, setIsWishlist] = useState(false);

	function handleAddtoCart(item) {
		const bookToAdd = {
			...item,
			totalPrice: item.price
		};

		addToCart(bookToAdd);
	}
	function handleAddtoWishList(item) {

		updateWishlist(item)
		console.log(item);
	}

	// console.log(layout);

	return (
		<section
			className={`${styles.container} ${
				layout === "grid" ? "gridLayout" : "listLayout"
			}`}
		>
			<section className={styles.product__img}>
				<img src={book?.image} alt={`an image of ${book?.title} book cover`} />
			</section>
			<section className={styles.product__details}>
				<header>
					<p className={styles.rating}>
						<span>{book?.rating }</span>
						<FaStar />
					</p>
				</header>
				<section className={styles.product__body}>
					<section className={styles.heading}>
						<h1>{book?.title}</h1>
						<hr />
					</section>
					<section className={` ${styles.price}`}>
						<p className={styles.new}>
						<FaNairaSign />
							<span>{book?.price}</span>
						</p>
						{book?.oldPrice !== 0 && <p className={styles.old}>
							<FaNairaSign />
							<span>{book?.oldPrice}</span>
							</p>}
					</section>
				</section>
				<footer className={styles.btns}>
					<button
						className={`${styles.items} ${styles.cart}`}
						onClick={() => handleAddtoCart(book)}
					>
						<MdAddShoppingCart />
						{layout === "grid" && <span>ADD TO CART</span>}
					</button>
					<button
						className={`${styles.items} ${styles.cart}`}
						onClick={() => handleAddtoWishList(book)}
					>
						{isWishlist ? <IoMdHeart /> : <IoMdHeartEmpty />}
						{layout === "grid" && <span>
							{isWishlist ? "Already in WishList" : "ADD TO WishList"}
						</span>}
					</button>
					<Link
						className={`${styles.items} ${styles.cart}`}
						to={`/books/${book?.id}`}
					>
						<TfiMoreAlt />
						{layout === "grid" && <span>More Details</span>}
					</Link>
				</footer>
				<section className={styles.overlay}></section>
			</section>
		</section>
	);
}

export default BookCard;
