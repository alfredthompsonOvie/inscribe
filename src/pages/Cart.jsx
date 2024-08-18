import { Link, useNavigate } from "react-router-dom";
import { FaNairaSign } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { useBooks } from "../context/BooksContext";
import styles from "./Cart.module.css";
// import { HiMinusSm } from "react-icons/hi";
// import { IoMdAdd } from "react-icons/io";

const SHIPPING_FEE = 50;
const VAT = 10;

const Cart = () => {
	const { cart, removeCart } = useBooks();

	const navigate = useNavigate();

	// const [bookQuantity, setBookQuantity] = useState(1)
	const total = cart.reduce((acc, cur) => acc + cur.totalPrice, 0);

	const grandTotalCalculation = total + SHIPPING_FEE + VAT;

	const grandTotal = grandTotalCalculation.toFixed(2);

	function handleDeleteCart(id) {
		removeCart(id);
	}
	// function handleAddToCart(book) {
	// 	updateCart(book)
	//  }

	// function handleIncreaseQuantity(id) {
	// 	console.log("clicked increase quantity", id);
	// }
	// function handleDecreaseQuantity(id) {
	// 	console.log("clicked decrease quantity", id)
	// }
	return (
		<main className={styles.container}>
			<h1 className={styles.title}>Shopping Cart</h1>
			<section className={styles.content}>
				{cart.length === 0 && (
					<section className={styles.message}>
						<p>Your cart is empty.</p>
						<Link to="/books" className={`${styles.btn} ${styles.btnLink}`}>
							Start Shopping
						</Link>
					</section>
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
										{/* <button
								className={styles.btnDecrease}
								onClick={()=>handleDecreaseQuantity(book.id)}
							>
								<HiMinusSm />
							</button> */}
										<p>{book.quantity}</p>
										{/* <button
								className={styles.btnIncrease}
								onClick={()=>handleIncreaseQuantity(book.id)}
							>
								<IoMdAdd />
							</button> */}
									</section>
									<section className={styles.cartItem__price}>
										<span className={styles.cartItem__price__span}>
											Total Price:{" "}
										</span>
										<p>
											<FaNairaSign /> <span>{book.totalPrice}</span>
										</p>
									</section>
								</li>
							))}
						</ul>

						<section className={styles.summary}>
							<h1>Summary</h1>
							<ul>
								<li>
									<span className={styles.summaryText}>Total</span>
									<p>
										<FaNairaSign />
										<span>{total}</span>
									</p>
								</li>
								<li>
									<span className={styles.summaryText}>Shipping</span>
									<p>
										<FaNairaSign />
										<span>{SHIPPING_FEE}</span>
									</p>
								</li>
								<li>
									<span className={styles.summaryText}>Vat(included)</span>
									<span></span>
									<p>
										<FaNairaSign />
										<span>{VAT}</span>
									</p>
								</li>
								<li>
									<span className={styles.summaryText}>Grand Total</span>
									<p>
										<FaNairaSign />
										<span>{grandTotal}</span>
									</p>
								</li>
							</ul>
							<button
								className={styles.btn}
								onClick={() => navigate("/checkout")}
							>
								Continue & pay
							</button>
						</section>
					</>
				)}
			</section>
		</main>
	);
};

export default Cart;
