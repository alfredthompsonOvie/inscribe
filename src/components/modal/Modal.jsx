/* eslint-disable react/prop-types */
import { useEffect } from "react";
import styles from "./Modal.module.css";
import { useNavigate } from "react-router-dom";

function Modal({ onCloseModal, title, linkPath, LinkText, books }) {
	const navigate = useNavigate()
	const totalPrice = books.reduce((acc, cur) => acc + cur.totalPrice, 0);

	function handleClick() {
		
		onCloseModal(false);
		navigate(linkPath);
	}

	useEffect(() => { 

		console.log(books)
	}, [books])



	// if(books.length === 0) return <p> Your cart is Empty</p>

	return (
		<section className={styles.container} onClick={() => onCloseModal(false)}>
			<section className={styles.content}>
				<section>
					<section
						className={`${styles.paper}`}
						onClick={(e) => e.stopPropagation()}
					>
						<span className={`${styles.tape_section} ${styles.topLeft}`}></span>
						<span
							className={`${styles.tape_section} ${styles.topRight}`}
						></span>
						<span
							className={`${styles.tape_section} ${styles.bottomLeft}`}
						></span>
						<span
							className={`${styles.tape_section} ${styles.bottomRight}`}
						></span>

						<header>
							<h1 className={styles.title}>{title}</h1>
						</header>

						{books.length === 0 && <p className={styles.emptyText}> Your cart is Empty</p>}

						{books.length !== 0 && <>
						<section className={styles.cards}>
							{books.map((book, idx) => (
								<section key={idx} className={styles.modalCard}>
									<section>
										<img
											src={book.image}
											alt={`an image of ${books.title} book cover`}
										/>
									</section>
									<section>
										<h1>{book.title}</h1>
									</section>
								</section>
							))}

						</section>

						{title === "cart" && (
							<section>
								<p>Total Price: {totalPrice}</p>
							</section>
						)}

						<button onClick={handleClick} className={styles.btn} >
							{LinkText}
						</button>
						</>}
					</section>
				</section>
			</section>
		</section>
	);
}

export default Modal;
