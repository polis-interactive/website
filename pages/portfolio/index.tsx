

import {WithLayout, PortfolioProps} from "types";

import styles from 'styles/Page.module.css'

import Head from 'next/head'
import Link from 'next/link'
import {NextPage} from "next";
import {getPortfolioMeta} from "lib/content-generators/portfolio";

import {Heading, chakra, Grid, GridItem, Flex} from "@chakra-ui/react";

import NextLink from "next/link";
import React from "react";


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
            <chakra.section pt="1rem" pb="2rem">
                <chakra.header>
                    <Heading as='h1' size='3xl'>Portfolio</Heading>
                    <Heading
                        as='h2' size='lg' fontStyle='italic'
                        mt={{base: '0.75rem', md:'0.25rem'}}
                    >*Or projects we&apos;ve deemed viewable by the general public</Heading>
                </chakra.header>
                <chakra.main mt="5rem">
                    <Grid
                        templateColumns={{base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)'}}
                        gap='0'
                    >
                        {portfolioMeta.map(({ slug, date, title, hero }) => (
                            <NextLink href={`/portfolio/${slug}`} key={slug}>
                                <GridItem as={chakra.a} position='relative' cursor="pointer">
                                    <chakra.img
                                        src={hero}
                                        width="100%"
                                    />
                                    <Flex
                                        position="absolute"
                                        top="0"
                                        left="0"
                                        bottom="0"
                                        right="0"
                                        justify="center"
                                        align="center"
                                        background='blackAlpha.500'
                                        color='white'
                                        opacity='0'
                                        _hover={{
                                            opacity: '1'
                                        }}
                                        transitionProperty='opacity'
                                        transitionTimingFunction='cubic-bezier(0.4, 0, 0.2, 1)'
                                        transitionDuration='150ms'
                                    >
                                        <chakra.div background='black' padding="0.5rem" textAlign='center'>
                                            { title }
                                        </chakra.div>
                                    </Flex>
                                </GridItem>
                            </NextLink>

                        ))}
                    </Grid>
                </chakra.main>
            </chakra.section>
        </div>
    )
}


export default Portfolio

