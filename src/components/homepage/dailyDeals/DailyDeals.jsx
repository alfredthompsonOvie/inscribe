import BookCard from "../../books/BookCard";
import Header from "../../sectionHeader/Header";
import styles from "./DailyDeals.module.css";
function DailyDeals() {
	return (
		<section className={styles.container}>
			<section className={styles.contents}>
        <Header title="Daily Deals" linkPath="#" linkText="View all" />
        
				<section className={styles.cardContainer}>
					<BookCard srcPath="/images/shining.jpeg" />
				</section>
			</section>
		</section>
	);
}

export default DailyDeals;
