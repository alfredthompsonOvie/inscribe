/* eslint-disable react/prop-types */
import { FaNairaSign } from 'react-icons/fa6'
import styles from './Summary.module.css'

function Summary({ total, grandTotal, SHIPPING_FEE, VAT, fn }) {
  
  function handleClick() {
    if (fn) {
      fn();
      return;
    };
    
    return;
  }

  return (
    <section className={styles.summary}>
							<h1>Summary</h1>
							<ul>
								<li>
									<span className={styles.summaryText}>Total</span>
									<p>
										<FaNairaSign />
										<span>{total.toFixed(2)}</span>
									</p>
								</li>
								<li>
									<span className={styles.summaryText}>Shipping</span>
									<p>
										<FaNairaSign />
										<span>{SHIPPING_FEE}</span>
									</p>
								</li>
								<li>
									<span className={styles.summaryText}>Vat(included)</span>
									<span></span>
									<p>
										<FaNairaSign />
										<span>{VAT}</span>
									</p>
								</li>
								<li>
									<span className={styles.summaryText}>Grand Total</span>
									<p>
										<FaNairaSign />
										<span>{grandTotal.toFixed(2)}</span>
									</p>
								</li>
							</ul>
							<button
								className={styles.btn}
								onClick={handleClick}
							>
								Continue & pay
							</button>
						</section>
  )
}

export default Summary
