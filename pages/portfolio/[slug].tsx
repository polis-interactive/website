
import { ContentSlugParams, PortfolioPostData} from "types";

import { getPortfolioSlugs, getPortfolioData } from "lib/content-generators/portfolio";
import {Flex, chakra, Heading, Text, VStack} from "@chakra-ui/react";
import styles from "styles/Page.module.css";
import Head from "next/head";
import React from "react";

import ReactHtmlParser from 'react-html-parser'

export async function getStaticProps({ params }: ContentSlugParams) {
    const postData = await getPortfolioData(params.slug);
    return {
        props: {
            ...postData,
        },
    };
};

export async function getStaticPaths() {
    const paths = getPortfolioSlugs();
    return {
        paths,
        fallback: false,
    };
}

function PrettifyDateName(d: string): string {
    const date = new Date(d);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    return `${month}, ${year}`
}

export default function PortfolioPost(post: PortfolioPostData) {

    const extraPreData: JSX.Element[] = [];

    const extraPostData: JSX.Element[] = [];

    if (!!post.site) {
        extraPreData.push(
            <Text key='site'>
                <chakra.span fontWeight='bold' pr='0.25rem'>Site:</chakra.span>
                { post.site }
            </Text>
        )
    }

    if (!!post.client) {
        extraPreData.push(
            <Text key='client'>
                <chakra.span fontWeight='bold' pr='0.25rem'>Client:</chakra.span>
                { post.client }
            </Text>
        )
    }

    if (!!post.event) {
        extraPreData.push(
            <Text key='event'>
                <chakra.span fontWeight='bold' pr='0.25rem'>Event:</chakra.span>
                { post.event }
            </Text>
        )
    }

    if (!!post.credits) {
        const credits: JSX.Element[] = [];
        post.credits.forEach((credit, i) => {
            credits.push(
                <Text key={`credit-${i}`}>
                    { ReactHtmlParser(credit) }
                </Text>
            );
        })
        extraPostData.push(
            <VStack key='credits' align='start' pt='1.25rem' spacing={0.5}>
                <Text fontWeight='bold' >Credits</Text>
                { credits }
            </VStack>
        )
    }


    return (
        <Flex
            as={chakra.section}
            direction={{base: 'column', lg: 'row'}}
            className={styles.container}
        >
            <Head>
                <title>Polis - { post.title }</title>
                <meta name="description" content={`Polis Interactive, portfolio piece ${post.title}`} />
            </Head>
            <Flex
                as={chakra.header}
                direction='column'
                boxSizing='content-box'
                width={{base:'auto', lg:'300px'}}
                paddingX={{base: '20px', md: '40px', lg: '32px'}}
                paddingY={{base: '20px', md: '40px', lg: '38px'}}
            >
                <VStack align='start' spacing={1}>
                    <Heading as='h1' size='lg'>{post.title}</Heading>
                    <Text key='date' fontSize='lg' fontStyle='italic'>
                        { PrettifyDateName(post.date) }
                    </Text>
                </VStack>
                <VStack align='start' pt='1.5rem' spacing={0.5}>
                    <Text key='type' fontSize='lg'>{ post.type }</Text>
                    <Text key='location'>
                        <chakra.span fontWeight='bold' pr='0.25rem'>Location:</chakra.span>
                        { post.location }
                    </Text>
                    { extraPreData }
                </VStack>
                <VStack align='start' pt='1.25rem' spacing={0.5}>
                    <Text fontWeight='bold'>Narrative</Text>
                    <Text fontSize='sm'>{post.narrative}</Text>
                </VStack>
                { extraPostData }
            </Flex>
            <Flex as={chakra.main}>
                Content
            </Flex>
            <Flex as={chakra.footer}>
                Next, last, menu
            </Flex>
        </Flex>
    );
}
