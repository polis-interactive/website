import NextLink from "next/link";
import {chakra, GridItem, Flex} from "@chakra-ui/react";
import React from "react";

import styles from 'styles/Header.module.css'

import { useRouter } from "next/router";

type HeaderItemProps = { href: string, title: string, aria: string }


export function HeaderItem(props: HeaderItemProps) {

    const { pathname } = useRouter()

    let headerItemClass = styles.headerItem
    if (pathname.includes(props.href)) {
      headerItemClass += ' ' + styles.active
    }

    return(
        <NextLink href={props.href} passHref>
            <chakra.a
                fontWeight='semibold'
                display='block'
                aria-label={props.aria}
                className={headerItemClass}
            >
                {props.title}
            </chakra.a>
        </NextLink>
    )
}

export function HeaderGridItem(props: HeaderItemProps) {

    const { pathname } = useRouter()

    let headerItemClass = styles.headerItem
    if (pathname.includes(props.href)) {
        headerItemClass += ' ' + styles.active
    }

    return(
        <GridItem>
            <NextLink href={props.href} passHref>
                <Flex
                    as={chakra.a}
                    fontWeight='semibold'
                    aria-label={props.aria}
                    className={headerItemClass}
                    align='center'
                    justify='center'
                    borderColor='var(--color-polis-primary)'
                    border='1px solid '
                >
                    {props.title}
                </Flex>
            </NextLink>
        </GridItem>
    )
}
