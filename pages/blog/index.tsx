
import type { ReactElement } from 'react'
import {NextPageWithLayout, BlogMetaProps, WithLayout} from "../../types";

import styles from '../../styles/Home.module.css'

import Head from 'next/head'
import Link from 'next/link'
import {getBlogMeta} from "../../lib/content-generators/blog";
import {NextPage} from "next";


export async function getStaticProps() {
    const blogMeta = getBlogMeta()
    return {
        props: {
            blogMeta
        }
    }
}


type BlogPage = NextPage<BlogMetaProps> & WithLayout

const Blog: BlogPage = ({ blogMeta }: BlogMetaProps) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Index" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1>BITCH IM A Blog /s</h1>
                <Link href="/">
                    <a>back...</a>
                </Link>
                <section>
                    <h2>Blog</h2>
                    <ul>
                        {blogMeta.map(({ slug, date, title }) => (
                            <li key={slug}>
                                {title}
                                <br />
                                <Link href={`/blog/${slug}`}>
                                    <a>{slug }</a>
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


export default Blog

