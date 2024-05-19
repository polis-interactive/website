import type { NextPage } from 'next'
import styles from 'styles/Page.module.css'
import {Box, Heading, Text} from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
      <Box className={styles.container}>
          <Box
              className={styles.centerContainerContent}
          >
              <Heading as='h2' size='xl'>
                  Home page to come 🙃
              </Heading>
              <Text maxW='600px' textAlign='center' mt='1rem'>
                  I mean probably... go checkout our portfolio in the meantime 🤗
              </Text>
          </Box>
      </Box>
  )
}

export default Home
