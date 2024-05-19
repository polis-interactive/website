
import styles from 'styles/WaterHounds.module.css'
import {
    Box, Heading,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input, Button, useToast
} from "@chakra-ui/react";
import type {NextPageWithLayout} from "types";


import Layout from 'layouts/waterhounds-layout';
import React, {useState} from "react";
import Head from "next/head";


const WaterHounds: NextPageWithLayout = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const [emailError, setEmailError] = useState('');

    const [canSubmit, setCanSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setEmailError('');
        setCanSubmit(value !== '');
    };

    const handleOtherChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
          setter(e.target.value);
          setEmailError('');
      };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const submit = async () => {
        setIsLoading(true);
        try {
            if (!emailRegex.test(email)) {
                setEmailError(`Pretty sure that's not a real email...`);
                return;
            }
            const response = await fetch('https://water-hounds-api.polis.tv/mailing-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, name, age})
            });
            if (!response.ok) {
                if (response.status < 500) {
                    setEmailError('... I have to think you messed up here')
                } else {
                    setEmailError('Broose probably messed up...')
                }
            } else {
                setEmail('');
                setName('');
                setAge('');
                setEmailError('');
                setCanSubmit(false);
                toast({
                    title: 'YEAH BOI 🗿',
                    containerStyle: {
                        maxWidth: '425px'
                    },
                    description: "You'll be the first to know if we ever get anywhere with this 💃",
                    status: 'success',
                    isClosable: true,
                    duration: 8000
                });
            }

        } catch(e) {
            setEmailError('SEND HALP')
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Box className={styles.container}>
            <Head>
                <title>Polis X Water Hounds</title>
                <meta name="description" content="Water Hounds, brought to you in part by Polis!" />
            </Head>
            <Box className={styles.centerContainer}>
                <Box className={styles.centerContainerContent}>
                    <Box className={styles.wordArtWrapper}>
                        <Box className={styles.wordArt}>
                            <Heading as='h1' className={styles.wordArtStyle11}>
                                WATER HOUNDS
                            </Heading>
                        </Box>
                    </Box>
                    <Box className={styles.formContainer}>
                        <Heading as='h2' textAlign='center' mt="1rem">
                            Join the mailing list!
                        </Heading>
                        <FormControl mt='1rem' isRequired isInvalid={emailError !== ''}>
                            <FormLabel htmlFor='email'>Email address</FormLabel>
                            <Input
                              id='email'
                              type='email'
                              placeholder='example@waterhounds.com'
                              value={email}
                              onChange={handleEmailChange}
                              disabled={isLoading}
                            />
                            {!emailError ? (
                              <FormHelperText>We will use your email for our personal gain</FormHelperText>
                            ) : (
                              <FormErrorMessage>{ emailError }</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl mt='1rem'>
                            <FormLabel htmlFor='name'>Name</FormLabel>
                            <Input
                              id='name'
                              value={name}
                              onChange={handleOtherChange(setName)}
                              disabled={isLoading}
                            />
                            <FormHelperText>We will refer to you as however you please</FormHelperText>
                        </FormControl>
                        <FormControl mt='1rem'>
                            <FormLabel htmlFor='age'>Age</FormLabel>
                            <Input
                              id='age'
                              value={age}
                              onChange={handleOtherChange(setAge)}
                              disabled={isLoading}
                            />
                            <FormHelperText>Feel free to lie</FormHelperText>
                        </FormControl>
                        <Button
                          mt={4}
                          colorScheme='teal'
                          type='submit'
                          isDisabled={!canSubmit}
                          isLoading={isLoading}
                          onClick={submit}
                        >
                            Submit
                        </Button>
                    </Box>
                    <Box className={styles.spacer} />
                </Box>

            </Box>
        </Box>
    )
}

WaterHounds.getLayout = Layout;

WaterHounds.wantsDark = true;

export default WaterHounds
