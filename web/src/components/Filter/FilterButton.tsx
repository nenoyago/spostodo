import { Button, Flex, Icon, useBreakpointValue } from '@chakra-ui/react';
import {
  RiCheckboxMultipleLine,
  RiCheckLine,
  RiErrorWarningLine,
} from 'react-icons/ri';

interface FilterButtonProps {
  defaultType: string;
  type: string;
  setType: (type: string) => void;
}

export function FilterButton({
  defaultType = 'all',
  type,
  setType,
}: FilterButtonProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const isActive = defaultType === type;

  return (
    <Button
      isActive={isActive}
      bg="gray.800"
      fontSize={['sm', 'lg']}
      height="24"
      as="button"
      rounded="md"
      color={isActive && 'gray.900'}
      shadow="md"
      borderWidth="1px"
      borderColor="transparent"
      transition="ease-in 200ms"
      onClick={() => setType(defaultType)}
      _active={{
        bg: 'blue.400',
      }}
      _hover={{
        borderColor: isActive ? 'transparent' : 'gray.700',
      }}
    >
      {defaultType === 'all' ? (
        <Flex
          align="center"
          direction={isWideVersion ? 'row' : 'column'}
          color={isActive && 'gray.900'}
          fontWeight={isActive ? 'bold' : 'normal'}
        >
          <Icon
            as={RiCheckboxMultipleLine}
            mr="2"
            fontSize="24"
            mb={!isWideVersion && '1'}
          />
          Todas
        </Flex>
      ) : defaultType === 'done' ? (
        <Flex
          align="center"
          direction={isWideVersion ? 'row' : 'column'}
          color={isActive ? 'gray.900' : 'green.500'}
          fontWeight={isActive ? 'bold' : 'normal'}
        >
          <Icon
            as={RiCheckLine}
            mr="2"
            fontSize="24"
            mb={!isWideVersion && '1'}
          />
          Concluídas
        </Flex>
      ) : (
        <Flex
          align="center"
          direction={isWideVersion ? 'row' : 'column'}
          color={isActive ? 'gray.900' : 'red.500'}
          fontWeight={isActive ? 'bold' : 'normal'}
        >
          <Icon
            as={RiErrorWarningLine}
            mr="2"
            fontSize="24"
            mb={!isWideVersion && '1'}
          />
          Pendentes
        </Flex>
      )}
    </Button>
  );
}
