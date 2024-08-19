import { Link, useNavigate } from "react-router-dom";
import { FaNairaSign } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { HiMinusSm } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { useBooks } from "../context/BooksContext";
import Summary from "../components/summary/Summary";
import Message from "../components/message/Message";
import styles from "./Cart.module.css";

const SHIPPING_FEE = 50;
const VAT = 10;

const Cart = () => {
	const {
		cart,
		removeCart,
		updateCartByIncreasingQuantity,
		updateCartByDecreasingQuantity,

	} = useBooks();

	const navigate = useNavigate();

	// ! revised
	const total = cart.reduce((acc, cur) => acc + cur.totalPrice, 0);
	const grandTotal = total + SHIPPING_FEE + VAT;

	function handleDeleteCart(id) {
		removeCart(id);
	}

	function handlePageNavigation() {
		navigate("/checkout");
	}

	function handleIncreaseQuantity(id) {
		updateCartByIncreasingQuantity(id);
	}

	function handleDecreaseQuantity(id) {
		updateCartByDecreasingQuantity(id);
	}


	

	return (
		<main className={styles.container}>
			<h1 className={styles.title}>Shopping Cart</h1>
			<section className={styles.content}>
				{cart.length === 0 && (
					<Message text="cart"/>
				)}

				{cart.length !== 0 && (
					<>
						<ul className={styles.cart}>
							<li key="cartListHeader">
								<p>Products</p>
								<p>Price</p>
								<p>Quantity</p>
								<p>total</p>
							</li>
							{cart.map((book) => (
								<li key={book.id} className={styles.cartItem}>
									<section className={styles.cartItem__profile}>
										<button
											className={styles.delBtn}
											onClick={() => handleDeleteCart(book.id)}
										>
											<IoCloseCircle />
										</button>
										<section className={styles.cartItem__img}>
											<img
												src={book.image}
												alt={`an image of ${book.title} book cover`}
											/>
										</section>
										<section className={styles.cartItem__name}>
											<Link to={`/books/${book.id}`}>{book.title}</Link>
											<p>{book.author}</p>
										</section>
									</section>
									<section className={styles.cartItem__price}>
										<span className={styles.cartItem__price__span}>
											Price:{" "}
										</span>
										<p>
											<FaNairaSign /> <span>{book.price}</span>
										</p>
									</section>
									<section className={styles.cartItem__quantity}>
										<button
											className={styles.btnDecrease}
											onClick={() => handleDecreaseQuantity(book.id)}
										>
											<HiMinusSm />
										</button>
										<p>{book.totalQuantity}</p>
										<button
											className={styles.btnIncrease}
											onClick={() => handleIncreaseQuantity(book.id)}
										>
											<IoMdAdd />
										</button>
									</section>
									<section className={styles.cartItem__price}>
										<span className={styles.cartItem__price__span}>
											Total Price:{" "}
										</span>
										<p>
											<FaNairaSign /> <span>{book.totalPrice.toFixed(2)}</span>
										</p>
									</section>
								</li>
							))}
						</ul>

						<Summary
							total={total}
							grandTotal={grandTotal}
							SHIPPING_FEE={SHIPPING_FEE}
							VAT={VAT}
							fn={handlePageNavigation}
						/>
					</>
				)}
			</section>
		</main>
	);
};

export default Cart;
