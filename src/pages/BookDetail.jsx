import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { HiMinusSm } from "react-icons/hi";
import { FaNairaSign } from "react-icons/fa6";

import { useBooks } from "../context/BooksContext";
import RelatedBooks from "../components/relatedItems/RelatedBooks";
import styles from "./BookDetail.module.css";

const BookDetail = () => {
	const { id } = useParams();
	const { books, updateCart, updateWishlist, cart, updateCartByIncreasingQuantity, updateCartByDecreasingQuantity } = useBooks();
	const navigate = useNavigate();

	const [book, setBook] = useState(null);
	const [showQuantity, setShowQuantity] = useState(null);


	function generateStarRating(rating) {
		const whole = Math.trunc(rating)
		const remainder = Math.round(rating - whole);
		const remainderStar = remainder === 1 ? 0.5 : 0;

		const starArray = Array.from({ length: whole }).map(() => 1);
		starArray.push(remainderStar);

		return starArray;
	}


	function handleIncreaseQuantity(id) {
		updateCartByIncreasingQuantity(id)
	}

	function handleDecreaseQuantity(id) {
		updateCartByDecreasingQuantity(id)
	}

	function handleAddToCart() {
		updateCart(book);
	}

	// ! check where to fetch the book from,( cart || books)

	useEffect(() => {
		let foundBook;

		const isInCart = cart.some((b) => b.id === parseInt(id));
		console.log("isInCart", isInCart);

		if (isInCart) {
			foundBook = cart?.find((b) => b.id === parseInt(id));
			console.log("foundBook", foundBook);
			setBook(foundBook);
			setShowQuantity(true)
			return;
		}

		foundBook = books?.find((b) => b.id === parseInt(id));
		setBook(foundBook);
	}, [id, books, cart]);


	return (
		<section className={styles.container}>
			<button
				onClick={() => navigate(-1)}
				className={`${styles.btn} ${styles.backBtn}`}
			>
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
								<p className={styles.product__newPrice}>
								<FaNairaSign />
									<span> {book?.price}</span>
								</p>
								{book?.oldPrice !== 0 && <>
									<p className={styles.product__discount}>{book?.discount}</p>
								<p className={styles.product__oldPrice}>
									
									<FaNairaSign />
									<span>{book?.oldPrice}</span>
								</p>
								</>}
							</section>
							{/* RATING */}
							<p className={styles.product__rating}>
								{generateStarRating(book?.rating).map((rating, idx) => {
									if (rating === 1) return <FaStar key={idx} />
									if(rating === 0.5) return <FaStarHalfAlt key={idx}/>
								return;
								})}
								
							</p>
						</section>
					</header>
					<section className={styles.product__description}>
						<h1>Description</h1>

						<p>{book?.description}</p>
					</section>
					{showQuantity && <section className={styles.product__quantity__section}>
						<section className={styles.product__quantity}>
							<h1>Quantity</h1>
							<section>
								<button
									className={styles.btnDecrease}
									onClick={()=>handleDecreaseQuantity(book.id)}
								>
									<HiMinusSm />
								</button>
								<p className={styles.quantity}>{book?.totalQuantity }</p>
								<button
									className={styles.btnIncrease}
									onClick={()=>handleIncreaseQuantity(book.id)}
								>
									<IoMdAdd />
								</button>
							</section>
						</section>
						<section className={styles.product__TotalPrice}>
							<h1>Total Price</h1>
							<section>
								<p className={styles.totalAmount}>
									<FaNairaSign />
									<span>{book?.totalPrice }</span>
								</p>
							</section>
						</section>
					</section>}
					<section className={styles.btns}>
						<button onClick={() => updateWishlist(book)} className={styles.btn}>
							Add to WishList
						</button>
						<button onClick={handleAddToCart} className={styles.btn}>
							Add to Cart
						</button>
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
