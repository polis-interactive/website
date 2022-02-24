
import { ContentSlugParams, PortfolioPostData} from "types";

import { getPortfolioSlugs, getPortfolioData } from "lib/content-generators/portfolio";
import {
    Flex,
    chakra,
    Heading,
    Text,
    VStack,
    Box,
    IconButton,
    IconButtonProps,
    useMediaQuery,
    useBreakpointValue,
    Button
} from "@chakra-ui/react";
import styles from "styles/Page.module.css";
import Head from "next/head";
import React from "react";

import ReactHtmlParser from 'react-html-parser'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Icon, IconName} from "@fortawesome/fontawesome-svg-core";

import NextLink from "next/link";

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

function ParseMediaBlock(m: Array<string>): JSX.Element {
    let elements: JSX.Element[] = [];
    m.forEach((item, i) => {
        let element: JSX.Element;
        if (item.includes('vimeo')) {
            element = (
                <iframe
                    src={`${item}?amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
                    frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen
                    className={styles.vimeo}
                    title="Creek Show 2018 - Ambedo Beta"
                />
            );
        } else {
            element = (<chakra.img src={item} width="100%" />)
        }
        elements.push(<chakra.div key={`media-${i}`} position="relative" width="100%">{ element }</chakra.div>)
    })
    return (<VStack> { elements }</VStack>)
}

type navButtonProps = {
    faiconnamebase: IconName, faiconnamelg: IconName,
    link: string, aria: string, text: string
}

function NavButton({faiconnamebase, faiconnamelg, link, aria, text}: navButtonProps): JSX.Element {

    const [isMinWidthLg, setIsMinWidthLg] = React.useState(false);
    const [mediaQuery] = useMediaQuery('(min-width: 62em)');

    React.useEffect(() => {
        if(mediaQuery !== isMinWidthLg){
            setIsMinWidthLg(mediaQuery);
        }
    }, [mediaQuery])

    return (
        <NextLink href={`/portfolio/${link}`} passHref>
            <chakra.a
                fontSize='20px'
                variant='ghost'
                bg='var(--color-polis-primary-0)'
                paddingY="1.5rem"
                padding="1rem"
                width={{ base: 'auto', lg: '100%'}}
                _hover={{ bg: 'var(--color-polis-primary-25)'}}
                _active={{
                    bg: 'var(--color-polis-primary-50)',
                    color: 'gray.600'
                }}
                display='flex'
                flexDirection='column'
                alignItems="center"
                justify="center"
                aria-label={aria}
            >
                <FontAwesomeIcon
                    icon={['fas', isMinWidthLg ? faiconnamelg : faiconnamebase]}
                    size="lg"
                />
                <Text
                    pt='0.25rem' fontSize='md' fontWeight='bold'
                    display={{base: 'none', lg: 'block'}}
                >
                    { text }
                </Text>
            </chakra.a>
        </NextLink>
    )

}

export default function PortfolioPost(post: PortfolioPostData) {

    const extraPreData: JSX.Element[] = [];
    let media: JSX.Element;
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

    if (!post.media) {
        media = (
            <Heading as='h2' size='4xl'>NO MEDIA SET D:</Heading>
        )
    } else {
        media = ParseMediaBlock(post.media)
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
            <Box
                as={chakra.header}
                width={{base:'auto', lg:'364px'}}
                paddingX={{base: '20px', md: '40px', lg: '32px'}}
                paddingY={{base: '20px', md: '40px', lg: '38px'}}
            >
                <Flex
                    direction='column'
                    width={{base:'100%', lg:'300px'}}
                    position={{base:'static', lg:'sticky'}}
                    top={{base: '0', lg: '118px'}}
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
                        <Text fontSize='sm'  dangerouslySetInnerHTML={{__html: post.narrative }}/>
                    </VStack>
                    { extraPostData }
                </Flex>
            </Box>
            <Flex as={chakra.main} flex="1 1 0" paddingTop='1rem' paddingBottom={{base: '1rem', lg:'4rem'}}>
                { media }
            </Flex>
            <Box as={chakra.footer}>
                <Flex
                    direction={{base: 'row', lg:'column'}}
                    position={{base:'static', lg:'sticky'}}
                    top={{base: '0', lg: '80px'}}
                    paddingX={{base: '0', lg: '20px'}}
                    align='center'
                    justify='center'
                    height={{ base: 'auto', lg: 'calc(100vh - 80px)'}}
                >
                    {
                        post.previous &&
                        <NavButton
                            link={post.previous}
                            faiconnamebase='chevron-left'
                            faiconnamelg='arrow-left'
                            aria={`portfolio item ${post.previous}`}
                            text='Previous'
                        />
                    }
                    <NavButton
                        link=''
                        faiconnamebase='layer-group'
                        faiconnamelg='layer-group'
                        aria='portfolio menu'
                        text='Menu'
                    />
                    {
                        post.next &&
                        <NavButton
                            link={post.next}
                            faiconnamebase='chevron-right'
                            faiconnamelg='arrow-right'
                            aria={`portfolio item ${post.next}`}
                            text='Next'
                        />
                    }
                </Flex>
            </Box>
        </Flex>
    );
}
