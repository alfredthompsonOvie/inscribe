/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import styles from './Genre.module.css'
import { IoIosArrowForward } from 'react-icons/io'
function Genre({genre}) {
	
  return (
    <section className={styles.category}>
					<section className={styles.category__contents}>
						{genre.map((genre, idx)=> <Link key={idx} to={`/books?genre_1=${genre}`} className={styles.category__link}>
							<section className={styles.category__card}>
								<section className={styles.category__cardlink__img}>
									<img src={`/images/${genre}.jpeg`} alt={`an image of ${genre} book cover`} />
								</section>
								<section className={styles.category__cardlink__contents}>
									<h1>{genre}</h1>
									<IoIosArrowForward />
								</section>
							</section>
						</Link>)}
						
					</section>
				</section>
  )
}

export default Genre
