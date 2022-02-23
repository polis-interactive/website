
import type {ReactElement} from "react";

import { Flex, chakra } from '@chakra-ui/react'

import Header from 'components/common/header'
import Footer from 'components/common/footer'

import styles from 'styles/Page.module.css'

export default function Layout(element: ReactElement) {
    return (
        <Flex as={chakra.section} direction='column' minHeight='100vh'>
            <Header />
            <chakra.main flex='1 1 auto'>{element}</chakra.main>
            <Footer />
        </Flex>
    )
}
