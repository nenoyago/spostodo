import { SimpleGrid } from "@chakra-ui/react";
import React from "react";

import { FilterButton } from "./FilterButton";

interface FilterProps {
  defaultTypes: string[];
  type: string;
  setType: (type: string) => void;
}

export function Filter({ defaultTypes, type, setType }: FilterProps) {
  return (
    <SimpleGrid columns={3} spacing={["2", "8"]} mt="4" mb="8">
      {defaultTypes.map((defaultType, index) => (
        <FilterButton key={index} defaultType={defaultType} type={type} setType={setType} />
      ))}
    </SimpleGrid>
  );
}