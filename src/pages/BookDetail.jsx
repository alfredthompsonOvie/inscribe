import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import booksData from '/data/data.json';
import styles from "./BookDetail.module.css";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

import { HiMinusSm } from "react-icons/hi";

import { useBooks } from "../context/BooksContext";
import RelatedBooks from "../components/relatedItems/RelatedBooks";


const BookDetail = () => {
	const { id } = useParams();
	const { books, updateCart, updateWishlist } = useBooks();
	const navigate = useNavigate();

	const [book, setBook] = useState(null);
	const price = book?.price;

	const [quantity, setQuantity] = useState(1);
	// derive total price from quantity
	const totalPrice = quantity * price;
	function handleIncreaseQuantity() {
		setQuantity((quantity) => quantity + 1);
		// console.log(quantity);
	}

	function handleDecreaseQuantity() {
		if (quantity == 1) return;
		setQuantity((quantity) => quantity - 1);
	}

	function handleAddToCart() {
		const bookToAdd = {
			...book,
			totalPrice,
			quantity,
		};
		// console.log(bookToAdd);
		updateCart(bookToAdd);
	}
// ! first check if its in cart 
	useEffect(() => {
		const foundBook = books?.find((b) => b.id === parseInt(id));
		setBook(foundBook);
	}, [id, books]);

	// if (!book) return <div>Loading...</div>;

	return (
		<section className={styles.container}>
			<button onClick={() => navigate(-1)} className={`${styles.btn} ${styles.backBtn}`}>
				<span>Back</span>
			</button>

			<section className={styles.content}>
				{/* image */}
				<section className={styles.product__img}>
					<img src={book?.image} alt={`a ${book?.image} book cover`} />
				</section>
				{/* product details */}
				<section className={styles.product__details}>
					<header className={styles.header}>
						<h1>{book?.title}</h1>
						<h2>{book?.author}</h2>
						<section className={styles.product__mainPrice__section}>
							<section className={styles.product__price}>
								<p className={styles.product__newPrice}>${book?.price}</p>
								<p className={styles.product__discount}>{book?.discount}</p>
								<p className={styles.product__oldPrice}>${book?.oldPrice}</p>
							</section>
							<p className={styles.product__rating}>
								<FaStar />
								<FaStar />
								<FaStar />
								<FaStar />
								<FaStarHalfAlt />
							</p>
						</section>
					</header>
					<section className={styles.product__description}>
						<h1>Description</h1>

						<p>{book?.description}</p>
					</section>
					<section className={styles.product__quantity__section}>
						<section className={styles.product__quantity}>
							<h1>Quantity</h1>
							<section>
								<button
									className={styles.btnDecrease}
									onClick={handleDecreaseQuantity}
								>
									<HiMinusSm />
								</button>
								<p className={styles.quantity}>{quantity}</p>
								<button
									className={styles.btnIncrease}
									onClick={handleIncreaseQuantity}
								>
									<IoMdAdd />
								</button>
							</section>
						</section>
						<section className={styles.product__TotalPrice}>
							<h1>Total Price</h1>
							<section>
								<p className={styles.totalAmount}>{totalPrice}</p>
							</section>
						</section>
					</section>
					<section className={styles.btns}>
						<button onClick={() => updateWishlist(book)} className={styles.btn}>
							Add to WishList
						</button>
						<button onClick={handleAddToCart} className={styles.btn}>Add to Cart</button>
					</section>
				</section>
			</section>

			{/* tesimonials */}
			<section className={styles.testimonial}>
				<header>
					<h1>Customer Reviews</h1>
				</header>
				<section className={styles.testimonial__cards}>
					{book?.testimonials.map((testimonial, idx) => (
						<section key={idx} className={styles.product__img}>
							<h1>{testimonial.user}</h1>
							<p>{testimonial.comment}</p>
						</section>
					))}
				</section>
			</section>
			{/* related items */}
			<RelatedBooks searchId={id} />
		</section>
	);
};

export default BookDetail;
