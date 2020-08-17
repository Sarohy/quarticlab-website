import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Footer from '../components/footer'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Zweidews</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous" />
      </Head>

      <main>
        <h1>Hello World!!</h1>
      </main>
      <Footer />
    </div>
  )
}
