import { Link } from 'react-router-dom'
import styles from './Genre.module.css'
import { IoIosArrowForward } from 'react-icons/io'
function Genre() {
  return (
    <section className={styles.category}>
					{/* just 5 cards of top categories */}
					<section className={styles.category__contents}>
						<Link to="" className={styles.category__link}>
							<section className={styles.category__card}>
								<section className={styles.category__cardlink__img}>
									<img src="/images/img_sales2.jpg" alt="" />
								</section>
								<section className={styles.category__cardlink__contents}>
									<h1>Fiction</h1>
									<IoIosArrowForward />
								</section>
							</section>
						</Link>
						<Link to="" className={styles.category__link}>
							<section className={styles.category__card}>
								<section className={styles.category__cardlink__img}>
									<img src="/images/img_sales2.jpg" alt="" />
								</section>
								<section className={styles.category__cardlink__contents}>
									<h1>Thriller</h1>
									<IoIosArrowForward />
								</section>
							</section>
						</Link>
						<Link to="" className={styles.category__link}>
							<section className={styles.category__card}>
								<section className={styles.category__cardlink__img}>
									<img src="/images/img_sales2.jpg" alt="" />
								</section>
								<section className={styles.category__cardlink__contents}>
									<h1>Horror</h1>
									<IoIosArrowForward />
								</section>
							</section>
						</Link>
						<Link to="" className={styles.category__link}>
							<section className={styles.category__card}>
								<section className={styles.category__cardlink__img}>
									<img src="/images/img_sales2.jpg" alt="" />
								</section>
								<section className={styles.category__cardlink__contents}>
									<h1>Educational</h1>
									<IoIosArrowForward />
								</section>
							</section>
						</Link>
						<Link to="" className={styles.category__link}>
							<section className={styles.category__card}>
								<section className={styles.category__cardlink__img}>
									<img src="/images/img_sales2.jpg" alt="" />
								</section>
								<section className={styles.category__cardlink__contents}>
									<h1>Fantasy</h1>
									<IoIosArrowForward />
								</section>
							</section>
						</Link>
						{/* <section className={styles.category__card}>
							</section>
							<section className={styles.category__card}>
								<Link to="" className={styles.category__cardlink}>
									<section className={styles.category__cardlink__img}>
										<img src="/images/img_sales2.jpg" alt="" />
									</section>
									<section className={styles.category__cardlink__contents}>
										<h1></h1>
										<IoIosArrowForward />
									</section>
								</Link>
							</section>
							<section className={styles.category__card}>
								<Link to="" className={styles.category__cardlink}>
									<section className={styles.category__cardlink__img}>
										<img src="/images/img_sales2.jpg" alt="" />
									</section>
									<section className={styles.category__cardlink__contents}>
										<h1></h1>
										<IoIosArrowForward />
									</section>
								</Link>
							</section>
							<section className={styles.category__card}>
								<Link to="" className={styles.category__cardlink}>
									<section className={styles.category__cardlink__img}>
										<img src="/images/img_sales2.jpg" alt="" />
									</section>
									<section className={styles.category__cardlink__contents}>
										<h1></h1>
										<IoIosArrowForward />
									</section>
								</Link>
							</section>
							<section className={styles.category__card}>
								<Link to="" className={styles.category__cardlink}>
									<section className={styles.category__cardlink__img}>
										<img src="/images/img_sales2.jpg" alt="" />
									</section>
									<section className={styles.category__cardlink__contents}>
										<h1></h1>
										<IoIosArrowForward />
									</section>
								</Link>
							</section> */}
					</section>
				</section>
  )
}

export default Genre
