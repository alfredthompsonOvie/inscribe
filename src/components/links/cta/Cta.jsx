/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from './Cta.module.css'
function Cta({children }) {
  return (
    <Link className={styles.cta} to="/app/bookings">
      {children}
    </Link>
  )
}

export default Cta
