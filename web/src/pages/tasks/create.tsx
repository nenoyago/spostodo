import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import axios from 'axios';

import { Box, Flex, Heading, Divider, VStack, Button, Text, HStack, SimpleGrid } from '@chakra-ui/react';

import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Header } from '../../components/Header';
import { Input } from '../../components/Form/Input';
import { TextArea } from '../../components/Form/TextArea';

import { ToastContainer, toast } from 'react-toastify';

import { useCreateTask } from '../../services/hooks/useCreateTask';

interface CreateTaskFormData {
  name: string;
  email: string;
  description: string;
}

interface GenerateRandomTaskData {
  text: string;
}

interface ValidateEmailResponse {
  email: string;
  didYouMean: string;
  formatValid: boolean;
  mxFound: boolean;
}

const createTaskFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório').min(3, 'No minimo 2 caracteres'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  description: yup.string()
    .required('Descricao obrigatória')
    .min(6, 'No minimo 6 caracteres')
    .max(144, 'No máximo 144 caracteres')
});

export default function CreateTask() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(createTaskFormSchema)
  });

  const createTask = useCreateTask();
  const [loading, setLoading] = useState(false);

  const handleCreateTask: SubmitHandler<CreateTaskFormData> = async (values) => {
    try {
      const response = await axios
        .post<ValidateEmailResponse>('http://localhost:3000/api/validate-email', {
          email: values.email
        });

      const { didYouMean, formatValid, mxFound } = response.data;

      if (!formatValid || !mxFound) {
        let message: string;

        if (didYouMean && didYouMean.trim() !== '') {
          message = `E-mail inválido, você quis dizer ${didYouMean}?`;
        } else {
          message = `E-mail inválido, por favor tente novamente!`;
        }

        toast.error(message, {
          bodyStyle: {
            backgroundColor: 'red.500'
          }
        });
        
        return;
      }

      await createTask.mutateAsync(values);

      toast.success('Obaa! Sua tarefa foi criada com sucesso 😀', {
        bodyStyle: {
          backgroundColor: 'green.500'
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function handleGenerateRandomTask() {
    try {
      setLoading(true);

      const { data } = await axios
        .get<GenerateRandomTaskData[]>('https://cat-fact.herokuapp.com/facts/random', {
          params: {
            animal_type: 'dog',
            amount: 3
          }
        });

      const tasks = data.map(fact => {
        return {
          name: 'Eu',
          email: 'eu@me.com',
          description: fact.text
        }
      });

      for await (const task of tasks) {
        await createTask.mutateAsync(task);
      }

      toast.success('Obaa! Foram geradas 3 novas tarefas para você 😀', {
        bodyStyle: {
          backgroundColor: 'green.500'
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box>

      <Head>
        <title>todo | Nova tarefa</title>
      </Head>
      <Header />

      <SimpleGrid width="100%" maxWidth={1480} spacing="4" minChildWidth="240px" mx="auto" my="6" px="6">
        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateTask)}
        >

          <Heading size="lg" fontWeight="normal" color="gray.300">Criar tarefa</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid columns={[1, 2]} spacing={["6", "8"]} width="100%">
              <Input name="name" label="Nome completo" error={errors.name} {...register('name')} />
              <Input name="email" label="E-mail" error={errors.email} {...register('email')} />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
              <TextArea name="description" label="Descricao" error={errors.description} {...register('description')} />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/tasks" passHref>
                <Button colorScheme="whiteAlpha">
                  Cancelar
              </Button>
              </Link>
              <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
                Salvar
            </Button>
            </HStack>
          </Flex>
        </Box>

        <Box
          borderRadius={8}
          flex="1"
          bg="gray.800"
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight="normal" color="gray.300">Estou sem tarefas</Heading>

          <Divider my="6" borderColor="gray.700" />

          <Box>
            <Text mb="4">Seja bem-vindo ao <Text as="span" color="gray.400">estou sem tarefas</Text>, mas o que é isso?</Text>
            <Text>
              Sabe quando você esta sem fazer nada e quer alguma tarefa para ocupar seu tempo?</Text>
            <Text>Então aqui você consegue gerar tarefas de um jeito aleatório para se ocupar e nunca mais ficar de bobeira!</Text>
            <Text as="h4" my="10" fontSize="lg" color="gray.400">
              Que tal começar agora mesmo? 🤗
              </Text>
          </Box>

          <Flex justify="flex-end">
            <Button
              type="button"
              onClick={handleGenerateRandomTask}
              colorScheme="blackAlpha"
              height="16"
              isLoading={loading}
            >
              Estou sem tarefas
            </Button>
          </Flex>
        </Box>

      </SimpleGrid>
      <ToastContainer limit={4} />
    </Box>
  );
}