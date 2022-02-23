
import React from 'react'

import {
    Button,
    Grid,
    GridItem,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay, Text, chakra, useBreakpointValue
} from "@chakra-ui/react";

import {CompetencyItem, competencyList} from "../../../content/misc/competencies";



interface CompetencyItemProp extends CompetencyItem {
    openModal: () => void
}

const CompetencyItemImpl = ({ title, openModal }: CompetencyItemProp) => {
    return (
        <GridItem width='100%'>
            <Button
                width='100%'
                onClick={openModal}
            >
                { title }
            </Button>
        </GridItem>
    )
}

interface CompetencyModalProps {
    title: string,
    information: string
    onClose: () => void
}

const CompetencyModal = ({ title, information, onClose }: CompetencyModalProps) => {

    const modalSize = useBreakpointValue({base: 'sm', sm: 'md', md: 'lg', lg: 'xl' })

    const isOpen = title !== '' && information !== ''

    return (
        <Modal
            isOpen={isOpen} onClose={onClose} isCentered={true}
            size={modalSize}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{ title }</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb='1.5rem'>
                    <Text fontSize='md' dangerouslySetInnerHTML={{ __html: information }} />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}


export const Competencies = () => {

    const [modalTitle, setModalTitle] = React.useState('')
    const [modalInformation, setModalInformation] = React.useState('')

    const onCloseModal = () => {
        setModalTitle(() => '')
        setModalInformation(() => '')
    }

    const modalOpenerFactory = (title: string, information: string) => {
        return () => {
            setModalTitle(() => title)
            setModalInformation(() => information)
        }
    }

    return(
        <>
            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)'
                }}
                gap={2}
                justifyItems='center'
                mb='2rem'
            >
                {
                    competencyList.map(c => (
                        <CompetencyItemImpl
                            title={c.title} information={c.information} key={c.title}
                            openModal={modalOpenerFactory(c.title, c.information)}
                        />
                    ))
                }
            </Grid>
            <CompetencyModal title={modalTitle} information={modalInformation} onClose={onCloseModal} />
        </>

    )
}
