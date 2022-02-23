

import styles from '../../styles/Page.module.css'

import Head from 'next/head'

import {NextPage} from "next";
import {Flex, Heading, Text, Box} from "@chakra-ui/react";

/*
import {BlogMetaProps, WithLayout} from "types";
import Link from 'next/link'
import {getBlogMeta} from "lib/content-generators/blog";
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
                <title>Polis - Blog</title>
                <meta name="description" content="Polis Interactive, blog directory" />
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

 */

const Blog: NextPage = () => {
    return (
        <Box className={styles.container}>
            <Head>
                <title>Polis - Blog</title>
                <meta name="description" content="Polis Interactive, blog directory" />
            </Head>
            <Box
                className={styles.centerContainerContent}
            >
                <Heading as='h2' size='xl'>
                    Alright Y&apos;all...
                </Heading>
                <Text maxW='600px' textAlign='center' mt='1rem'>
                    There&apos;s going to be some super serious blog content here in the future,
                    detailing like how we make everything. For now, just grin and bare with us :D
                </Text>
            </Box>
        </Box>
    )
}

export default Blog

