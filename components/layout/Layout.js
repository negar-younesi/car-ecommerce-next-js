import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import styles from './Layout.module.css'
import CartIcon from '../module/CartIcon'
import Toast from '../module/Toast'
import { useCart } from '../context/CartContext'

function Layout({children}) {
  const { totalCount, toasts } = useCart();

  return (
<>
<Head>
  <title>BOTOCAR - Choose and Buy Your Car</title>
  <meta name="description" content="Find your perfect car from our wide selection of quality vehicles" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</Head>
<header className={styles.header}>
    <Link href="/">
    <h2>BOTOCAR</h2>
    <p>choose and buy your car</p>
    </Link>
    <div className={styles.headerActions}>
      <Link href="/orders" className={styles.ordersLink}>
        Orders
      </Link>
      <Link href="/cart" className={styles.cartLink}>
        <CartIcon itemCount={totalCount} />
      </Link>
    </div>
</header>
<div className={styles.container}>{children}</div>
<footer className={styles.footer}>
    Next.js botocar project &copy; {new Date().getFullYear()}
</footer>

<div className={styles.toastContainer}>
  {toasts.map((t) => (
    <Toast key={t.id} message={t.message} type={t.type} />
  ))}
</div>
</>
  )
}

export default Layout