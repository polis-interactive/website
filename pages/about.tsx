import type { NextPage } from 'next'
import Head from 'next/head'
import pageStyles from 'styles/Page.module.css'
import aboutStyles from 'styles/About.module.css'
import {Box, Heading, Text, chakra} from "@chakra-ui/react";
import { Competencies } from "components/about/competencies";

const About: NextPage = () => {
    return (
        <Box className={pageStyles.container}>
            <Head>
                <title>Polis - About</title>
                <meta name="description" content="Polis Interactive, about page" />
            </Head>
            <Box
                className={aboutStyles.container}
                mt={{ base: 0, md: '1rem', lg: '3rem' }}
            >
                <Heading as='h2' className={aboutStyles.mainHeader}>Mission Statement!</Heading>
                <Text className={aboutStyles.mainParagraph}>
                    Polis is a tech forward installation group based in Austin, Texas.
                    With backgrounds in different fields of engineering, technology, and art,
                    we strive to make the usually esoteric and arcane available to the general public.
                    We want to use our diverse skill sets to create unique, innovative, and immersive
                    experiences for the communities we live in.
                </Text>
                <Heading as='h2' className={aboutStyles.mainHeader}>Capabilities?</Heading>
                <Text className={aboutStyles.mainParagraph}>
                    So what exactly does Polis <chakra.span fontWeight='bold'>DO</chakra.span>? We
                    ask ourselves this everyday... we have no &quot;core-competency&quot;, rather we like
                    to tackle interesting and hard problems. The following is a non-exhaustive list of abilities
                    we&apos;d like to brag about. If broose did his job right, you should be able to tap on each
                    one if you&apos;d care to hear us rant about them!
                </Text>
                <Competencies />
                <Heading as='h2' className={aboutStyles.mainHeader}>Meet the team :D</Heading>
                <Text className={aboutStyles.mainParagraph}>
                    So what exactly does Polis <chakra.span fontWeight='bold'>DO</chakra.span>? We
                    ask ourselves this everyday... we have no &quot;core-competency&quot;, rather we like
                    to tackle interesting and hard problems. The following is a non-exhaustive list of abilities
                    we&apos;d like to brag about. If broose did his job right, you should be able to tap on each
                    one if you&apos;d care to hear us rant about them!
                </Text>
            </Box>
        </Box>
    )
}

export default About
