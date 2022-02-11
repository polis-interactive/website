import type { NextPage } from 'next'
import styles from 'styles/Page.module.css'
import NextLink from 'next/link'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        HELLO FROM POLIS BETCH
      </main>
    </div>
  )
}

export default Home
