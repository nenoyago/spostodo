import React, { useCallback, useEffect, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

import { Flex, Box, Heading, Text, SimpleGrid, Spinner, VStack } from '@chakra-ui/react';

import { Filter } from '../../components/Filter';
import { Header } from '../../components/Header';
import { TaskCard } from '../../components/TaskCard';

import { useTasks } from '../../services/hooks/useTasks';

import api from '../../services/api';

interface TasksProps {
  enablePassword: boolean;
}

export default function Tasks({ enablePassword = true }: TasksProps) {
  const [type, setType] = useState('all');
  const [widthBar, setWidthBar] = useState(0);
  const { data, isLoading, isFetching } = useTasks(type);

  useEffect(() => {
    document.addEventListener('scroll', updateBar);

    return () => document.removeEventListener('scroll', updateBar);
  }, []);

  const updateBar = useCallback(() => {
    const pagePositionY = window.scrollY;

    let progressScrollbar = Math.trunc(pagePositionY / (document.body.scrollHeight - window.innerHeight) * 100);

    progressScrollbar = progressScrollbar > 100 ? 100 : progressScrollbar;

    setWidthBar(progressScrollbar);
  }, [widthBar]);

  return (
    <div>
      <Head>
        <title>todo | Tarefas</title>
      </Head>

      <Box>
        <Box
          position="fixed"
          top="0"
          left="0"
          transition="linear"
          transitionDuration="400ms"
          zIndex="999"
          w={`${widthBar}%`}
          bg="blue.400"
          h="1" />
        <Header />

        <Flex
          width="100%"
          direction="column"
          maxWidth={1480}
          my="6"
          mx="auto"
          px="6"
        >

          <Filter
            type={type}
            defaultTypes={['all', 'pending', 'done']}
            setType={setType}
          />

          {isLoading
            ? (
              <Box m="auto" mt="20">
                <Spinner color="blue.400" />
              </Box>
            )
            :
            <>
              {data?.length > 0
                ?
                (<VStack spacing="4" align="flex-start">
                  <Box>
                    <Heading size="lg" mt="4" mb="8" color="gray.400">
                      {type === 'all' ? 'Todas tarefas' :
                        type === 'pending' ? 'Tarefas pendentes' : 'Tarefas concluídas'}

                      {!isLoading && isFetching && <Spinner size="sm" color="gray.600" ml="4" />}
                    </Heading>
                  </Box>

                  <SimpleGrid columns={[1, 1, 2, 3, 4]} spacing={["4", "8"]} width="100%">
                    {data.map(task => (
                      <TaskCard key={task.id} {...task} enablePassword={enablePassword} />
                    ))}
                  </SimpleGrid>
                </VStack>)
                :
                <Box m="auto" mt="20" display="flex" align="center">
                  {type === 'all'
                    ? (
                      <Text color="gray.400" fontSize="lg">
                        Ainda não encontramos nenhuma tarefa cadastrada, que tal
                        <Text
                          color="blue.400"
                          fontSize="2xl"
                          mt="2"
                          _hover={{
                            textDecoration: 'underline'
                          }}>
                          <Link href="/tasks/create">
                            começar agora? 😀
                          </Link>
                        </Text>
                      </Text>
                    )
                    : type === 'pending'
                      ?
                      <Text color="gray.400" fontSize="lg">
                        Não há nenhuma tarefa pendente.
                      </Text>
                      :
                      <Text color="gray.400" fontSize="lg">
                        Não há nenhuma tarefa concluída.
                  </Text>
                  }

                </Box>
              }
            </>
          }
        </Flex>
      </Box>

    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (props) => {
  const { data } = await api.get('settings');

  return {
    props: {
      enablePassword: data.enable_password
    }
  }
}