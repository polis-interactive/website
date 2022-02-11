
import React from 'react'

import {chakra, Flex, HStack, useUpdateEffect, useDisclosure} from "@chakra-ui/react";

import { useViewportScroll } from 'framer-motion'

import NextLink from 'next/link'

import { HeaderItem } from "./header-item";
import {MobileNavButton, MobileNavContent} from "./navigation";

function HeaderContent() {

    const mobileNav = useDisclosure()

    const mobileNavBtnRef = React.useRef<HTMLButtonElement>()

    useUpdateEffect(() => {
        mobileNavBtnRef.current?.focus()
    }, [mobileNav.isOpen])

    return (
        <>
            <Flex w='100%' h='100%' px='6' align='center' justify='space-between'>
                <Flex
                    justify='flex-start'
                    align='center'
                    maxW='1100px'
                >
                    <HStack spacing='8' display={{ base: 'none', md: 'flex' }}>
                        <HeaderItem href='/portfolio' title='PORTFOLIO' aria='Polis, to portfolio directory' />
                        <HeaderItem href='/about' title='ABOUT' aria='Polis, to about page' />
                        <HeaderItem href='/blog' title='BLOG' aria='Polis, to blog directory' />
                    </HStack>
                    <MobileNavButton
                        ref={mobileNavBtnRef}
                        onClick={mobileNav.onOpen}
                        aria-label='Open Menu'
                        faiconname='bars'
                    />
                </Flex>
                <Flex align='center'>
                    <NextLink href='/' passHref>
                        <chakra.a display='block' aria-label='Chakra UI, Back to homepage'>
                            <chakra.img
                                src={require('public/images/site/polis_logo_h60.png')}
                                display={{ base: 'none', md: 'block' }}
                            />
                            <chakra.img
                                src={require('public/images/site/polis_icon_60.png')}
                                minW='3rem' display={{ base: 'block', md: 'none' }}
                            />
                        </chakra.a>
                    </NextLink>
                </Flex>
            </Flex>
            <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} />
        </>
    )
}

export default function Header() {

    const ref = React.useRef<HTMLHeadingElement>()
    const [y, setY] = React.useState(0)
    const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

    const { scrollY } = useViewportScroll()
    React.useEffect(() => {
        return scrollY.onChange(() => setY(scrollY.get()))
    }, [scrollY])

    return(
        <chakra.header
            transition='box-shadow 0.2s, background-color 0.2s'
            shadow={y > height ? 'sm' : undefined}
            pos='sticky'
            top='0'
            zIndex='3'
            bg='white'
            left='0'
            right='0'
            width='full'
        >
            <chakra.div height='80px' mx='auto' maxW='8xl'>
                <HeaderContent />
            </chakra.div>
        </chakra.header>
    )
}
