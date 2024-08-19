import { FaNairaSign } from "react-icons/fa6";
import { useBooks } from "../context/BooksContext";
import styles from "./Wishlist.module.css";
import { IoCloseCircle } from "react-icons/io5";
import Message from "../components/message/Message";

function Wishlist() {
	const { wishlist, removeWishlist, moveToCart } = useBooks();


	function handleDeleteWishlist(id) {
		removeWishlist(id)
	 }
	function handleMoveToCart(book) {
		moveToCart(book)
	 }

	return (
		<main className={styles.container}>
			<h1 className={styles.title}>Wishlist</h1>
			<section className={styles.content}>
				{/* ! NOTIFIES THE USER THAT CART IS EMPTY */}
				{wishlist.length === 0 && <Message text="wishlist"/>}


				{wishlist.length !== 0 && <ul className={styles.cart}>
					<li key="listHeader">
						<p>Products</p>
						<p>Price</p>
					</li>
					{wishlist.map(book => <li key={book.id} className={styles.cartItem}>
						<section className={styles.cartItem__profile}>
							<button className={styles.delBtn} onClick={()=>handleDeleteWishlist(book.id)}>
								<IoCloseCircle />
							</button>
							<section className={styles.cartItem__img}>
								<img
									src={book.image}
									alt={`an image of ${book.title} book cover`}
								/>
							</section>
							<section className={styles.cartItem__name}>
								<h1>{book.title}</h1>
								<p>{book.author}</p>
							</section>
						</section>
						<section className={styles.cartItem__price}>
							<span className={styles.cartItem__price__span}>Price: </span>
							<p>
								<FaNairaSign /> <span>{book.price}</span>
							</p>
						</section>
						<button className={styles.btn} onClick={()=> handleMoveToCart(book)}>Move To Cart</button>
					</li>)}

				</ul>}
			</section>
		</main>
	);
}

export default Wishlist;
