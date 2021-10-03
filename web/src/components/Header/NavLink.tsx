import { ElementType } from 'react';
import { Text, Link as ChakraLink, Icon, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { ActiveLink } from './ActiveLink';

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex"alignItems="center" {...rest}>
        <Icon as={icon} />
        <Text
          fontSize={["sm", "lg"]}
          fontWeight="medium"
          ml={["1", "2"]}
        >
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}