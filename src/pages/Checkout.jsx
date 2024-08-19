import styles from "./Checkout.module.css";

import { FaNairaSign } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useBooks } from "../context/BooksContext";
import { useForm } from "react-hook-form";
import Summary from "../components/summary/Summary";

const SHIPPING_FEE = 50;
const VAT = 10;

function Checkout() {
	const { cart, resetCart } = useBooks();
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	// ! SUMMARY CALCULATION
	const total = cart.reduce((acc, cur) => acc + cur.totalPrice, 0);
	const grandTotalCalculation = total + SHIPPING_FEE + VAT;
	const grandTotal = grandTotalCalculation;

	// ! THANK YOU MODAL
	const firstBookInCart = cart.slice(0, 1)[0];
	console.log(firstBookInCart);
	const numberOfItemsLeft = cart.slice(1).length;

	// ! FORM VALIDATION
	const { register, handleSubmit, watch, reset } = useForm();

	const paymentMethod = watch("paymentMethod");

	const onSubmit = (data) => {
		console.log(data);
		setIsOpen(true);
		reset();
	};

	// ! MODAL
	function handleModal() {
		setIsOpen(false);
		resetCart();
		navigate("/");
	}

	return (
		<main className={styles.container}>
			<section className={styles.content}>
				<button
					className={`${styles.btn} ${styles.backBtn}`}
					onClick={() => navigate(-1)}
				>
					Go Back
				</button>

				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<section className={styles.fieldset__group}>
						<h1>Checkout</h1>
						<fieldset>
							<legend>Personal Information</legend>
							<section className={styles.form__group__container}>
								<section className={styles.form__group}>
									<label htmlFor="name">Name</label>
									<input
										type="text"
										id="name"
										placeholder="alfred thompson ovie"
										required
										{...register("name", { required: true })}
									/>
								</section>
								<section className={styles.form__group}>
									<label htmlFor="email">Email Address</label>
									<input
										type="email"
										id="email"
										placeholder="alfredthompsonovie@gmail.com"
										required
										{...register("email", { required: true })}
									/>
								</section>
								<section className={styles.form__group}>
									<label htmlFor="tel">Phone Number</label>
									<input
										type="tel"
										id="tel"
										placeholder="+2348073328875"
										required
										{...register("tel", { required: true })}
									/>
								</section>
							</section>
						</fieldset>

						<fieldset>
							<legend>Shipping info</legend>

							<section className={styles.form__group}>
								<label htmlFor="address">Your Address</label>
								<input
									type="text"
									id="address"
									placeholder="abc lekki lagos"
									required
									{...register("address", { required: true })}
								/>
							</section>

							<section className={styles.form__group__container}>
								<section className={styles.form__group}>
									<label htmlFor="zipCode">ZIP Code</label>
									<input
										type="number"
										id="zipCode"
										placeholder="101241"
										required
										{...register("zipCode", { required: true })}
									/>
								</section>
								<section className={styles.form__group}>
									<label htmlFor="city">City</label>
									<input
										type="text"
										id="city"
										placeholder="lagos"
										required
										{...register("city", { required: true })}
									/>
								</section>
								<section className={styles.form__group}>
									<label htmlFor="country">Country</label>
									<input
										type="text"
										id="country"
										placeholder="Nigeria"
										required
										{...register("country", { required: true })}
									/>
								</section>
							</section>
						</fieldset>
						<fieldset>
							<h1>Payment details</h1>
							<section className={styles.form__group__container}>
								<legend>Payment Method</legend>
								<section
									className={`${styles.form__group} ${styles.form__group__radio}`}
								>
									<input
										type="radio"
										id="creditCard"
										required
										value="payOnline"
										{...register("paymentMethod", { required: true })}
									/>
									<label htmlFor="creditCard">e-Money</label>
								</section>
								<section
									className={`${styles.form__group} ${styles.form__group__radio}`}
								>
									<input
										type="radio"
										id="paymentOnDelivery"
										value="paymentOnDelivery"
										required
										{...register("paymentMethod", { required: true })}
									/>
									<label htmlFor="paymentOnDelivery">Cash on Delivery</label>
								</section>
							</section>
						</fieldset>

						<section>
							{paymentMethod === "payOnline" && (
								<section className={styles.creditCard}>
									<section
										className={`${styles.form__group} ${styles.cardName}`}
									>
										<label htmlFor="nameOnCard">Name on Card</label>
										<input
											type="text"
											id="nameOnCard"
											placeholder="alfred thompson ovie"
											required
											{...register("nameOnCard", { required: true })}
										/>
									</section>
									<section
										className={`${styles.form__group} ${styles.cardNumber}`}
									>
										<label htmlFor="cardNumber">Card Number</label>
										<input
											type="number"
											id="cardNumber"
											placeholder="1234567891234567"
											required
											{...register("cardNumber", { required: true })}
										/>
									</section>
									<section className={`${styles.form__group} ${styles.cvc}`}>
										<label htmlFor="cvc">CVC</label>
										<input
											type="number"
											id="cvc"
											placeholder="123"
											required
											{...register("cvc", { required: true })}
										/>
									</section>
									<section
										className={`${styles.form__group} ${styles.expMonth}`}
									>
										<label htmlFor="expMonth">Exp. Month</label>
										<input
											type="number"
											id="expMonth"
											placeholder="04"
											required
											{...register("expMonth", { required: true })}
										/>
									</section>
									<section
										className={`${styles.form__group} ${styles.expYear}`}
									>
										<label htmlFor="expYear">Exp. Year</label>
										<input
											type="number"
											id="expYear"
											placeholder="2028"
											required
											{...register("expYear", { required: true })}
										/>
									</section>
								</section>
							)}

							{paymentMethod === "paymentOnDelivery" && (
								<section className={styles.payOnDelivery}>
									<GiTakeMyMoney />
									<p>
										The ‘Cash on Delivery’ option enables you to pay in cash
										when our delivery courier arrives at your residence. Just
										make sure your address is correct so that your order will
										not be cancelled.
									</p>
								</section>
							)}
						</section>
					</section>

					{/* <section className={styles.summary}>
						<h1>Summary</h1>
						<section></section>
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
									<span>{VAT}</span>
								</p>
							</li>
							<li>
								<span className={styles.summaryText}>Vat(included)</span>
								<p>
									<FaNairaSign />
									<span>{ SHIPPING_FEE}</span>
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
						<button>Continue & pay</button>
					</section> */}

					<Summary
						total={total}
						grandTotal={grandTotal}
						SHIPPING_FEE={SHIPPING_FEE}
						VAT={VAT}
					/>
				</form>
			</section>

			{isOpen && (
				<section className={styles.modal}>
					<section className={styles.modalContent}>
						<FaCheckCircle className={styles.checkmark} />
						<h1>
							Thank You <span> For Your Order</span>
						</h1>
						<p>You will receive an email confirmation shortly.</p>
						<section className={styles.productSectionContainer}>
							<section className={styles.productSection}>
								<section className={styles.products}>
									<img src={firstBookInCart?.image} alt="product" />
									<section>
										<h1>{firstBookInCart?.title}</h1>
										<p className={styles.price}>
											<span>Price:</span>

											<span>
												{" "}
												<FaNairaSign /> {firstBookInCart?.totalPrice}
											</span>
										</p>
									</section>

									<p className={styles.productQuantity}>
										<span>x</span>
										<span>{firstBookInCart?.quantity}</span>
									</p>
								</section>
								<section className={styles.otherProductQuantity}>
									<p>and {numberOfItemsLeft} other item(s)</p>
								</section>
							</section>
							<section className={styles.grandTotalSection}>
								<h1>Grand Total</h1>
								<p>
									<FaNairaSign />
									<span>{grandTotal}</span>
								</p>
							</section>
						</section>
						<button onClick={handleModal}>Back to Homepage</button>
					</section>
				</section>
			)}
		</main>
	);
}

export default Checkout;
