/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./Sidebar.module.css";

import { FaArrowRightToBracket } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";

function Sidebar({categories, setSortBy}) {

	const [isOpen, setIsOpen] = useState(false);

	function handleClick(query) {
		// console.log(query);
		setSortBy(query);
		setIsOpen(false);
	}
	return (
		<aside className={`${styles.sidebar} ${isOpen ? "isOpen" : ""}`}>
			<button className={styles.sidebarBtn} onClick={() => setIsOpen(!isOpen)}>
				{isOpen ? <IoMdCloseCircle /> : <FaArrowRightToBracket />}
			</button>
			<section className={styles.sidebarContent}>
				<section>
					<h1>Shop by Category</h1>
					<ul>
						<li>
							<button onClick={() => handleClick("default")}>All Genre</button>
						</li>
						{categories.map((category) => (
							<li key={category}>
								<button onClick={() => handleClick(category)}>
									{category}
								</button>
							</li>
						))}
					</ul>
				</section>
				{/* <section>
					<h1>Price Range</h1>
					<input type="range" min={10} max={100} />
				</section> */}
			</section>
		</aside>
	);
}

export default Sidebar;
