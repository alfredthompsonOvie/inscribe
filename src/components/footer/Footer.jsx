import Brand from "../links/brand/Brand";
import styles from "./Footer.module.css";
import { FaSquareFacebook } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { FaSquareInstagram } from "react-icons/fa6";

function Footer() {
	return (
		<footer className={styles.footer}>
			<section className={styles.content}>
				<Brand mode="footer" />
				<p className={styles.description}>
					Inscribe is your ultimate destination for literary treasures. We're a
					passionate team of book enthusiasts dedicated to helping you discover
					and enjoy the perfect read. Whether you're seeking the latest
					bestseller or a timeless classic, we have something for every reader.
					Visit us online anytime, or stop by our cozy reading corner—we’re here
					7 days a week to inspire your next literary journey.
				</p>
				<section className={styles.socials}>
					<p>Copyright 2024. All Rights Reserved</p>
					<ul>
						<li>
							<a href="#">
								<FaSquareFacebook />
							</a>
						</li>
						<li>
							<a href="#">
								<RiTwitterXFill />
							</a>
						</li>
						<li>
							<a href="#">
								<FaSquareInstagram />
							</a>
						</li>
					</ul>
				</section>
			</section>
		</footer>
	);
}

export default Footer;
