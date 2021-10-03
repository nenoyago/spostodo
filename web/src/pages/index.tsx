import Head from 'next/head'
import { Flex, Box, Text, Button, Heading, Image, useBreakpointValue } from '@chakra-ui/react';

import Link from "next/link"

export default function Home() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  return (
    <>
      <Head>
        <title>todo | Início</title>
      </Head>

      <Flex
        direction="column"
        width="100%"
        height="100vh"
        maxWidth={1480}
        mx="auto"
        px="6"
        justify="center"
        align="center"
      >
        <Flex
          direction={isWideVersion ? 'row' : 'column-reverse'}
          align="center"
          justify="center"
          margin="auto"
          width="100%"
        >

          <Box p={["2", "4"]}>
            <Text
              as="h2"
              lineHeight={["1.2", "1.4"]}
              fontSize="3xl"
              color="gray.400"
            >
              Seja bem-vindo ao
              <Heading
                as="h2"
                size={isWideVersion ? '2xl' : 'xl'}
                color="blue.400"
              >
                Spos todo
                </Heading>
            </Text>
            <Text fontSize={["sm", "lg"]} my={["4", "6"]} maxWidth="90%">
              Aqui você poderá criar tarefas para o seu <br />
                dia a dia e nunca mais se esquecer de concluí-las.
              </Text>
            <Link href="/tasks" passHref>
              <Button
                type="button"
                mt="4"
                size={isWideVersion ? 'lg' : 'md'}
                height="14"
                width="296px"
                colorScheme="blue"
              >
                Começar
           </Button>
            </Link>
          </Box>

          {isWideVersion
            ? <Image
              src="/images/landing.svg"
              alt="Task board"
              maxWidth={["300px", "600px"]}
              ml="4"
            />
            : <Image
              src="/images/landing-mobile.svg"
              alt="Task board"
              height={["200"]}
              mb="6"
            />
          }

        </Flex>
      </Flex>
    </>
  )
}
