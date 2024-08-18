import { FaTruck } from "react-icons/fa6";
import { GiMoneyStack, GiReceiveMoney } from "react-icons/gi";
import { FaNairaSign } from "react-icons/fa6";
import Cta from "../../button/Cta";
import styles from "./Hero.module.css";


function Hero() {
	return (
		<section className={styles.hero}>
			<section className={styles.illustration}>
				<section className={styles.illustration__img}>
					<img src="/images/hero2.jpg" alt="" />
				</section>
				<section className={styles.illustration__contents}>
					<h1>Discover Your Next Great Read</h1>
					<p>
						Explore a world of books at your fingertips. From bestsellers to
						hidden gems, find your next favorite book today.
					</p>
					<p className={styles.typesOfGenre}>Browse by Category | Daily Deals | New Arrivals</p>
					<Cta linkPath="/books" text="Show Now" mode="hero"/>
				</section>
			</section>
			<section className={styles.sales}>
				<section className={styles.sales_imgContainer}>
					<section className={styles.sales_illustration}>
						<img src="/images/img_sales2.jpg" alt="" />
					</section>
					<section className={styles.sales_contents}>
						<header>
							<h1 className={styles.sales__title_1}>
								<span>The</span>
								<span className={styles.sales__title_span}>b</span>
								<span className={styles.sales__title_span}>e</span>
								<span className={styles.sales__title_span}>s</span>
								<span className={styles.sales__title_span}>t</span>
							</h1>
							<span className={styles.sales__title_2}>sales</span>
							<span className={styles.sales__figure}>
								<span className={styles.sales__figure_num}>50</span>
								<span className={styles.sales__figure_per}>
									<span>%</span>
									<span>off</span>
								</span>
							</span>
						</header>
					</section>
				</section>

				<section>
					<ul>
						<li>
							<section className={styles.sales__icon}>
								<FaTruck />
							</section>
							<section>
								<h1>free shipping </h1>
								<p>
									<span>for all orders above </span>
									{" "}
									<span><FaNairaSign /> 500</span>
								</p>
							</section>
						</li>
						<li>
							<section className={styles.sales__icon}>
								<GiMoneyStack />
							</section>
							<section>
								<h1>Money back guarante </h1>
								<p>100% money back guarante</p>
							</section>
						</li>
						<li>
							<section className={styles.sales__icon}>
								<GiReceiveMoney />
							</section>
							<section>
								<h1>Cash on delivery </h1>
								<p>for all orders</p>
							</section>
						</li>
					</ul>
				</section>
			</section>
		</section>
	);
}

export default Hero;
