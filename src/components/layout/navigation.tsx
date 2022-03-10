import * as React from 'react'

import {
    IconButton, IconButtonProps,
    Flex, Grid,
    useBreakpointValue, useUpdateEffect, chakra
} from "@chakra-ui/react";

import { AnimatePresence, motion } from 'framer-motion'
import { RemoveScroll } from 'react-remove-scroll'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import useRouteChanged from 'hooks/use-route-changed'
import {IconName} from "@fortawesome/fontawesome-svg-core";
import { HeaderGridItem } from "components/layout/header-item";
import NextLink from "next/link";


type MobileNavButtonProps = IconButtonProps & { faiconname: IconName }

export const MobileNavButton = React.forwardRef(
    (props: MobileNavButtonProps, ref: React.Ref<any>) => {
        return (
            <IconButton
                ref={ref}
                display={{ base: 'flex', md: 'none' }}
                fontSize='20px'
                variant='ghost'
                icon={<FontAwesomeIcon
                    icon={['fas', props.faiconname]}
                    size="lg"
                />}
                bg='var(--color-polis-primary-0)'
                paddingY="1.5rem"
                padding="1rem"
                _hover={{ bg: 'var(--color-polis-primary-25)'}}
                _active={{
                    bg: 'var(--color-polis-primary-50)',
                    color: 'gray.600'
                }}
                {...props}
            />
        )
    },
)

MobileNavButton.displayName = 'MobileNavButton';

interface MobileNavContentProps {
    isOpen: boolean
    onClose: () => void
}

export function MobileNavContent(props: MobileNavContentProps) {
    const { isOpen, onClose } = props
    const closeBtnRef = React.useRef<HTMLButtonElement>()

    useRouteChanged(onClose)

    /**
     * Scenario: Menu is open on mobile, and user resizes to desktop/tablet viewport.
     * Result: We'll close the menu
     */
    const showOnBreakpoint = useBreakpointValue({ base: true, lg: false })

    React.useEffect(() => {
        if (showOnBreakpoint == false) {
            onClose()
        }
    }, [showOnBreakpoint, onClose])

    useUpdateEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => {
                closeBtnRef.current?.focus()
            })
        }
    }, [isOpen])

    const [shadow, setShadow] = React.useState<string>()

    return (
        <AnimatePresence>
            {isOpen && (
                <RemoveScroll forwardProps>
                    <motion.div
                        transition={{duration: 0.08}}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <Flex
                            flexDirection='column'
                            w='100%'
                            h='100vh'
                            overflow='auto'
                            pos='absolute'
                            top='0'
                            left='0'
                            zIndex={20}
                            bg='white'
                        >
                            <Flex
                                w='100%' height='80px' px='6' justify='space-between' align='center'
                            >
                                <Flex
                                    justify='flex-start'
                                    align='center'
                                    maxW='1100px'
                                >
                                    <MobileNavButton
                                        ref={closeBtnRef}
                                        onClick={onClose}
                                        aria-label='Close Menu'
                                        faiconname='close'
                                    />
                                </Flex>
                                <Flex align='center'>
                                    <NextLink href='/portfolio' passHref>
                                        <chakra.a display='block' aria-label='Chakra UI, Back to homepage'>
                                            <chakra.img
                                                src={require('public/images/site/polis_logo_h60.png')}
                                            />
                                        </chakra.a>
                                    </NextLink>
                                </Flex>
                            </Flex>
                            <Grid
                                px='4rem'
                                pb='6'
                                pt='2rem'
                                shadow={shadow}
                                templateColumns='repeat(2, 1fr)'
                                gap='2rem'
                            >
                                <HeaderGridItem href='/portfolio' title='PORTFOLIO' aria='Polis, to portfolio directory' />
                                <HeaderGridItem href='/about' title='ABOUT' aria='Polis, to about page' />
                                <HeaderGridItem href='/blog' title='BLOG' aria='Polis, to blog directory' />
                            </Grid>
                        </Flex>
                    </motion.div>
                </RemoveScroll>
            )}
        </AnimatePresence>
    );
}
