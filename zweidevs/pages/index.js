import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Footer from '../components/footer'
import Navbar from '../components/navbar'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Zweidews</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous" />
      </Head>
      <Navbar />

      <div class={styles.content_area}>
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 col-12">
              <main id="main" class={styles.site_main}>
                <section className={styles.animated_shape}>
                  <img src="/layout.png" alt="svg"/>
                </section>
              </main>
            </div>
          </div>
        </div>
      </div>


      <Footer />
    </div>
  )
}
