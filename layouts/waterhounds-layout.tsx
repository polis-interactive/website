
import type {ReactElement} from "react";

import { Flex, chakra } from '@chakra-ui/react'

export default function Layout(element: ReactElement) {
    return (
        <Flex as={chakra.section} direction='column' minHeight='100vh'>
            <chakra.main flex='1 1 auto'>{element}</chakra.main>
        </Flex>
    )
}
