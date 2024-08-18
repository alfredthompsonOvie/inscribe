import { useForm } from "react-hook-form";
import styles from "./SpecialOffer.module.css";
import { useState } from "react";

function SpecialOffer() {
	const [hasSubscribed, setHasSubscribed] = useState(false);

	function notifySubscribed() {
		setTimeout(() => { 
			setHasSubscribed(false);
		}, 2000)
	}
	
	const {
		formState: { errors },
		handleSubmit,
		register,
		reset,
	} = useForm();
	
	function onSubmit(data) {
		console.log(data);
		setHasSubscribed(true)
		
		notifySubscribed();
		reset();
	}

	return (
		<section className={styles.container}>
			<section className={styles.content}>
				<h1 className={styles.title}>Get special offer in your inbox</h1>

				<section>
					<div className={`${styles.paper}`}>
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
							<h1>Subscribe</h1>
							<p>
								Subscribe to our newsletter and be the first to know about new
								arrivals, exclusive deals, and special offers.
							</p>
						</header>

						<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
							<section className={styles.formControl}>
								<label htmlFor="email"></label>
								<input
									type="email"
									id="email"
									placeholder="Enter your email"
									aria-invalid={errors.email ? "true" : "false"}
									{...register("email", {
										required: "Email Address is required",
									})}
									className={errors.email ? styles.error__input : ""}
								/>
								{errors.email && (
									<p role="alert" className={styles.error}>
										{errors.email.message}
									</p>
								)}
							</section>
							<button type="submit" className={styles.btn}>
								Subscribe
							</button>
						</form>
						<p>We respect your privacy. You can unsubscribe at any time.</p>

						{hasSubscribed && (
							<section className={styles.notification}>
								<p>
									Thank you for subscribing to our newsletter! We're thrilled to
									have you as part of the Inscribe community. Expect to receive
									the latest updates, exclusive deals, and book recommendations
									straight to your inbox.
								</p>
								<p>Happy reading!</p>
								<section>
									<p>Warm regards, </p>
									<p className={styles.sign}>The Inscribe Team</p>
								</section>
							</section>
						)}
					</div>
				</section>
			</section>
		</section>
	);
}

export default SpecialOffer;
