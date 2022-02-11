

import {WithLayout, PortfolioProps} from "types";

import styles from 'styles/Page.module.css'

import Head from 'next/head'
import Link from 'next/link'
import {NextPage} from "next";
import {getPortfolioMeta} from "lib/content-generators/portfolio";


export async function getStaticProps() {
    const portfolioMeta = getPortfolioMeta()
    return {
        props: {
            portfolioMeta
        }
    }
}


type PortfolioPage = NextPage<PortfolioProps> & WithLayout

const Portfolio: PortfolioPage = ({ portfolioMeta }: PortfolioProps) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Polis - Portfolio</title>
                <meta name="description" content="Polis Interactive, portfolio directory" />
            </Head>

            <main className={styles.main}>
                <h1>BITCH IM A Portfolio /s</h1>
                <Link href="/">
                    <a>back...</a>
                </Link>
                <section>
                    <h2>Portfolio</h2>
                    <ul>
                        {portfolioMeta.map(({ slug, date, title }) => (
                            <li key={slug}>
                                {title}
                                <br />
                                <Link href={`/portfolio/${slug}`}>
                                    <a>{ slug }</a>
                                </Link>
                                <br />
                                {date}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    )
}


export default Portfolio

