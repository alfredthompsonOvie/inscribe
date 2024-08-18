/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import styles from './Cta.module.css'
function Cta({linkPath, text, mode}) {
  return (
    <Link to={linkPath} className={`${styles.link} ${ mode === "hero" ? "heroCta" : ""}`}>
      {text}
    </Link>
  )
}

export default Cta
