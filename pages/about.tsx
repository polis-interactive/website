import type { NextPage } from 'next'
import Head from 'next/head'
import styles from 'styles/Page.module.css'
import NextLink from 'next/link'
import Link from "next/link";

const About: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Polis - About</title>
                <meta name="description" content="Polis Interactive, about page" />
            </Head>

            <main className={styles.main}>
                We some scrubs
            </main>
        </div>
    )
}

export default About
