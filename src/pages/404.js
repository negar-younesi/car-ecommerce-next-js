import Link from 'next/link'
import styles from '../styles/404.module.css'

export default function Custom404() {
  return (
    <div className={styles.container}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link href="/" className={styles.homeLink}>
        Go back home
      </Link>
    </div>
  )
}
