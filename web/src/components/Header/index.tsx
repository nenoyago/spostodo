import { Flex, Text, Stack, Divider } from '@chakra-ui/react';
import { NavLink } from './NavLink';

import { RiMenuFill, RiAddLine, RiQuestionLine } from 'react-icons/ri';

export function Header() {
  return (
    <Flex
      as="header"
      direction="column"
      width="100%"
      maxWidth={1480}
      mx="auto"
      mt="6"
      px="6"
    >

      <Flex width="100%" height="20" align="center">
        <Text
          color="gray.300"
          fontSize={["2xl", "5xl"]}
          letterSpacing="tight"
          fontWeight="bold"
        >
          <Text as="span" mr="2" color="blue.400">-</Text>
        todo
      </Text>

        <Stack
          spacing={["3", "6"]}
          direction="row"
          align="center"
          ml="auto"
        >
          <NavLink href="/tasks" icon={RiMenuFill}>Tarefas</NavLink>
          <NavLink href='/tasks/create' icon={RiAddLine}>Nova tarefa</NavLink>
        </Stack>
      </Flex>

      <Divider mt="4" borderColor="gray.700" />

    </Flex>

  );
}