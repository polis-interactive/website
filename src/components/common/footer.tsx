
import {chakra, Box, HStack, Text, IconButton} from "@chakra-ui/react";
import {IconName, IconPrefix} from "@fortawesome/fontawesome-svg-core";

import styles from 'styles/Component.module.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface FooterIconProps {
    icon: [IconPrefix, IconName]
    href: string
    aria: string
}

const FooterIcon = ({ icon, href, aria }: FooterIconProps) => {
    return (
        <chakra.a
            className={styles.footerItem}
            aria-label={aria}
            href={href}
            target='_blank'
        >
            <FontAwesomeIcon
                icon={icon}
                height='24px'
                //@ts-ignore
                size='xl'
            />
        </chakra.a>
    )
}

const footerIconContent: FooterIconProps[] = [
    {
        icon: ['far', 'envelope'],
        aria: 'Email Link',
        href: 'mailto:bruce@polis.tv'
    },
    {
        icon: ['fab', 'instagram'],
        aria: 'Check out our instagram',
        href: 'https://www.instagram.com/polis_interactive/'
    },
    {
        icon: ['fab', 'vimeo-v'],
        aria: 'Check out our Vimeo',
        href: 'https://vimeo.com/user94925372'
    },
    {
        icon: ['fab', 'tiktok'],
        aria: "Check out dan's tiktok",
        href: 'https://www.tiktok.com/@dannthehuman'
    }
]

export default function Footer() {
    return (
        <Box
            as={chakra.footer}
            flex='0 0 auto'
            pos='sticky'
            bottom='0'
            zIndex='3'
            bg='white'
            left='0'
            right='0'
            width='full'
            py='0.5rem'
        >
            <HStack
                mr={{ base: 0, md: '2rem' }}
                justify={{ base: 'center', md: 'end'}}
                gap={1.5}
            >
                {
                    footerIconContent.map(c => (
                        <FooterIcon
                            icon={c.icon} aria={c.aria} href={c.href}
                            key={c.aria}
                        />
                    ))
                }
            </HStack>
        </Box>
    )
}
