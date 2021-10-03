import { Box, Checkbox, Divider, Flex, Icon, IconButton, Text, VStack } from '@chakra-ui/react';
import { RiDeleteBinLine } from 'react-icons/ri';

import { toast } from 'react-toastify';

import { useUpdateTask } from '../../services/hooks/useUpdateTask';
import { useRemoveTask } from '../../services/hooks/useRemoveTask';

interface TaskCardProps {
  id: string;
  description: string;
  name: string;
  done: boolean;
  enablePassword: boolean;
}

interface UpdateTaskFormData {
  id: string;
  done: boolean;
  password?: string;
}

export function TaskCard({ id, description, name, done, enablePassword }: TaskCardProps) {
  const updateTask = useUpdateTask();
  const removeTask = useRemoveTask();

  async function handleCheckToDone(id: string, checked: boolean) {
    try {
      let data: UpdateTaskFormData = {
        id,
        done: checked
      }

      if (!checked) {
        if (enablePassword) {
          const password = prompt('Por favor informe a senha de autorização:');

          if (!password) {
            return;
          }

          data = {
            ...data,
            password
          }
        }
      }

      await updateTask.mutateAsync(data);

      toast.success(`A tarefa foi movida para ${checked ? 'concluída 🤗' : 'pendente, e ai? Bora concluir? 😅'}`, {
        bodyStyle: {
          backgroundColor: 'green.500'
        }
      });
    } catch (err) {
      console.error(err);
    }

  }

  async function handleRemoveTask(id: string, done: boolean) {
    try {
      if (done) {
        if (enablePassword) {
          const password = prompt('Por favor informe a senha de autorização para remover esta tarefa:');

          if (!password) {
            return;
          }

          await removeTask.mutateAsync({ id, password });
        }
      }

      toast.success(`A tarefa foi removida com sucesso 🤗`, {
        bodyStyle: {
          backgroundColor: 'green.500'
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Box
      position="relative"
      rounded="md"
      shadow="md"
      maxWidth="sm"
      minHeight="sm"
      overflow="hidden"
      bg={done ? "gray.900" : "gray.800"}
      transition="ease-in-out"
      border="1px"
      borderColor="transparent"
      transitionDuration="200ms"
      _hover={{
        borderColor: !done && "blue.400",
      }}
    >
      {(done) && (
        <IconButton
          colorScheme="red"
          aria-label="Remove task"
          fontSize="20"
          variant="unstyled"
          float="right"
          onClick={() => handleRemoveTask(id, done)}
          icon={
            <Icon as={RiDeleteBinLine}
              transition="ease-in-out"
              transitionDuration="200ms"
              color="red.400"
              _hover={{
                color: 'red.500'
              }}
            />}
          _focus={{
            boxShadow: 'none'
          }}
        />
      )}

      <Flex
        direction="column"
        align="center"
        justify="space-between"
        height="100%"
        p={["4", "6"]}
      >

        <VStack spacing="4" width="100%" height="227" justifyContent="space-between">
          <Text
            mt="1"
            noOfLines={6}
            fontWeight="semibold"
            as="h4"
            fontSize="xl"
            lineHeight="tight"
            align="center"
            color="gray.200"
            overflow="hidden"
          >
            {description}
          </Text>

          <Text
            isTruncated
            width="100%"
            mt="4"
            as="span"
            color="gray.400"
            fontSize="lg"
            textAlign="center"
          >
            {name}
          </Text>
        </VStack>


        <Divider my="4" borderColor="blue.400" />

        <VStack spacing="4" align="center">
          <Text as="span" fontSize="lg" color="gray.200">
            {(done) ? 'Tarefa concluida' : 'Marcar como concluido'}
          </Text>

          <Checkbox
            checked={done}
            isChecked={done}
            onChange={(e) => handleCheckToDone(id, e.target.checked)}
            size="lg"
            colorScheme="blue"
            iconSize="1rem"
          />
        </VStack>

      </Flex>
    </Box>
  );
}