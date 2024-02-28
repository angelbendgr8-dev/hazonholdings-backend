import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { map } from "lodash";
import React, { useState } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
export interface SelectData {
  id: number;
  title: string;
  value: any;
}
type Props = {
  data: SelectData[];
  onSelect: (value: any) => void;
  value: any;
  placeholder: string;
  closeable?: boolean;
  hasRadio?: boolean;
  remove?: () => void;
};

const SelectItem = ({
  item,
  onSelect,
  isSelected,
  hasRadio = true,
}: {
  item: any;
  onSelect: any;
  isSelected: boolean;
  hasRadio?: boolean;
}) => {
  return (
    <Button
      w="100%"
      display={"flex"}
      flexDir={"row"}
      border={0}
      h={10}
      p={0}
      alignItems={"center"}
      _hover={{ bg: "transparent", borderBottomWidth: 1 }}
      justifyContent={"space-between"}
      onClick={() => onSelect(item)}
    >
      <Text fontWeight={"500"} fontSize={"14px"} lineHeight={0} pl="6">
        {item.title}
      </Text>
      {hasRadio && (
        <Box
          h={5}
          w="5"
          rounded={"full"}
          border={"1px"}
          borderColor={isSelected ? "primary.900" : "gray.300"}
          mr="6"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box
            h={2}
            w="2"
            rounded={"full"}
            bg={isSelected ? "primary.900" : "transparent"}
          ></Box>
        </Box>
      )}
    </Button>
  );
};
const CustomSelect = ({
  data,
  onSelect,
  value,
  placeholder,
  closeable = false,
  hasRadio = true,
  remove,
}: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selected, setSelected] = useState<SelectData>();

  const handleSelect = (value: SelectData) => {
    setSelected(value);
    onSelect(value);
    setShowMenu(false);
  };
  return (
    <Box
      borderWidth={0.5}
      borderColor={"#CDD5DF"}
      display={"flex"}
      alignItems={"center"}
      rounded={"md"}
      _hover={{ borderWidth: 1, borderColor: "primary.900" }}
      w="100%"
      pos={"relative"}
      gap={2}
    >
      {closeable && (
        <IconButton
          _hover={{
            bg: "transparent",
          }}
          border={0}
          aria-label="close"
          size={"md"}
          pr={0}
          onClick={remove}
        >
          <Icon as={AiOutlineMinusCircle} color={"error.900"} />
        </IconButton>
      )}
      <Button
        w="100%"
        variant={"ghost"}
        size={"md"}
        mx={0}
        _hover={{
          bg: "transparent",
        }}
        borderRadius={"8px"}
        pl={closeable?0: 3}
        onClick={() => setShowMenu(!showMenu)}
      >
        <HStack flex={1} alignItems={"center"} justifyContent={"space-between"}>
          <Text
            fontSize={"14px"}
            fontWeight={"400"}
            color={selected ? "black.100" : "#9AA4B2"}
          >
            {selected ? selected.value : placeholder}
          </Text>
          <Icon color="#4B5565" size={8} as={MdKeyboardArrowDown} />
        </HStack>
      </Button>
      {showMenu && (
        <VStack
          bg={"white"}
          border={"1px"}
          borderColor={"#CDD5DF"}
          w="100%"
          pos={"absolute"}
          zIndex={20}
          top={12}
          borderRadius={"8px"}
          flex={1}
        >
          {map(data, (item, index) => (
            <SelectItem
              key={index}
              item={item}
              isSelected={item.id === selected?.id}
              onSelect={(value: SelectData) => handleSelect(value)}
              hasRadio={hasRadio}
            />
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default CustomSelect;
