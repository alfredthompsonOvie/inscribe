import BookCard from "../../books/BookCard"
import styles from './TrendingBooks.module.css'
import Header from "../../sectionHeader/Header"
function TrendingBooks() {
  return (
    <section className={styles.trending}>
      <Header title="Trending on Inscribe"  linkPath="#" linkText="View All"/>

      <section className={styles.trendingBooks}>
        <BookCard srcPath="/images/product-item1.png" />
        <BookCard srcPath="/images/product-item1.png" />
        <BookCard srcPath="/images/product-item3.png" />
        <BookCard srcPath="/images/product-item4.png" />
      </section>
      
    </section>
  )
}

export default TrendingBooks
