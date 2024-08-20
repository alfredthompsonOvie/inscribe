/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";

import { FaArrowRightToBracket } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

function Sidebar({ categories, findBooksByGenre }) {
	
	const [searchParams] = useSearchParams();
	

	const [isOpen, setIsOpen] = useState(false);
	const [isGenre, setIsGenre] = useState("all");

	function handleClick(genre) {
		console.log(genre)
		// setSortBy(genre);
		setIsOpen(false);
		findBooksByGenre(genre)

	}

	useEffect(() => {
    const genreHome = searchParams.get("genre_1");
		const genre = searchParams.get("sortBy-category");
		console.log(genreHome, genre)
    if (genreHome) setIsGenre(genreHome);
    if (genre) setIsGenre(genre);
	}, [searchParams]);
	
	return (
		<aside className={`${styles.sidebar} ${isOpen ? "isOpen" : ""}`}>
			<button className={styles.sidebarBtn} onClick={() => setIsOpen(!isOpen)}>
				{isOpen ? <IoMdCloseCircle /> : <FaArrowRightToBracket />}
			</button>
			<section className={styles.sidebarContent}>
				<section>
					<h1 className={styles.sidebar__heading}>Shop by Category</h1>
					<ul>
						<li className={`${styles.listItem} ${isGenre === "all" ? styles.listItem__active : ""}`}>
							<button onClick={() => handleClick("all")}>All Genre</button>
						</li>
						{categories.map((genre) => (
							<li key={genre} className={`${styles.listItem} ${isGenre === genre ? styles.listItem__active : ""}`}>
								<button onClick={() => handleClick(genre)}>
									{genre}
								</button>
							</li>
						))}
					</ul>
				</section>
				
				{/* feature to be implemented later */}
				{/* <section>
					<h1>Price Range</h1>
					<input type="range" min={10} max={100} />
				</section> */}
			</section>
		</aside>
	);
}

export default Sidebar;
