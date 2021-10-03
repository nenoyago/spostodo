import React, { forwardRef, ForwardRefRenderFunction } from "react";
import { FormControl, FormErrorMessage, FormLabel, Icon, Textarea, TextareaProps as ChakraTextAreaProps } from '@chakra-ui/react';

import { FieldError } from "react-hook-form";
import { RiErrorWarningLine } from "react-icons/ri";


interface TextAreaProps extends ChakraTextAreaProps {
  name: string;
  label?: string;
  error: FieldError;
}

const TextAreaBase: ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaProps> = (
  {
    name,
    label,
    error,
    ...rest
  }: TextAreaProps, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <Textarea
        name={name}
        focusBorderColor="blue.400"
        borderColor="transparent"
        id={name}
        ref={ref}
        bgColor="gray.900"
        p="4"
        _hover={{
          borderColor: 'transparent'
        }}
        {...rest}
      />

      {!!error && (
        <FormErrorMessage>
          {error.message}
          <Icon as={RiErrorWarningLine} ml="1"/>
        </FormErrorMessage>
      )}
    </FormControl>
  );
}

export const TextArea = forwardRef(TextAreaBase);