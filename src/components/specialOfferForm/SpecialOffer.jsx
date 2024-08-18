import styles from "./SpecialOffer.module.css";

function SpecialOffer() {
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

						<form className={styles.form}>
							<section className={styles.formControl}>
								<label htmlFor="email"></label>
								<input
									type="email"
									id="email"
									name="email"
									placeholder="Enter your email"
								/>
							</section>
							<button type="submit" className={styles.btn}>Subscribe</button>
						</form>
						<p>We respect your privacy. You can unsubscribe at any time.</p>
					</div>
				</section>
			</section>
		</section>
	);
}

export default SpecialOffer;
