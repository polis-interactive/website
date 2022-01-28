

import type { ReactElement } from 'react'
import {NextPageWithLayout, BlogMetaProps, WithLayout, PortfolioProps} from "../../types";

import styles from '../../styles/Home.module.css'

import Head from 'next/head'
import Link from 'next/link'
import {getBlogMeta} from "../../lib/content-generators/blog";
import {NextPage} from "next";
import {getPortfolioMeta} from "../../lib/content-generators/portfolio";


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
                <title>Create Next App</title>
                <meta name="description" content="Index" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1>BITCH IM A Portfolio /s</h1>
                <Link href="/">
                    <a>back...</a>
                </Link>
                <section>
                    <h2>Blog</h2>
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

