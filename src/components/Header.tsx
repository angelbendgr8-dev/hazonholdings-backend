import { Box, HStack, Icon, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image';
import React, { useState } from 'react'
import { RxDashboard } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
const Header = () => {
     const [online, setOnline] = useState<boolean>(true);
  return (
    <HStack
      bg={"white"}
      borderBottom={"1px"}
      borderBottomColor={"#CDD5DF"}
      w="100vw"
      pt={4}
      px={12}
      justifyContent={"space-between"}
    >
      <Image
          src="/assets/hazon.png"
          width={45}
          height={45}
          alt="Avatar"
          className="md:w-6 w-20 h-20 md:h-6 rounded-full"
        />
      <HStack display={"flex"} flexDir={"row"}>
       

        <HStack>
          <Box position={"relative"}>
            <Image
              src="/assets/Avatar.png"
              width={45}
              height={45}
              alt="Avatar"
              className="md:w-6 w-20 h-20 md:h-6 rounded-full"
            />
            <Box
              pos={"absolute"}
              right={0}
              bottom={0}
              height={4}
              width={4}
              rounded={"100%"}
              border={"2px solid"}
              borderColor={"white"}
              bg={online ? "#048272" : ""}
            ></Box>
          </Box>
          <Icon size={"md"} _hover={{ color: "#047668" }} as={IoIosArrowDown} />
          {/* <VStack
            display={"flex"}
            flexDir={"column"}
            alignItems={"flex-start"}
            pb={4}
          >
            <Text
              fontSize={"14px"}
              lineHeight={6}
              textAlign={"left"}
              fontWeight={"500"}
            >
              Aitanun Daniel
            </Text>
            <Text
              fontSize={"11px"}
              mt={0}
              pt={0}
              textAlign={"left"}

              fontWeight={"400"}
            >
              daniel.aitanun@alethian.com
            </Text>
          </VStack> */}
        </HStack>
      </HStack>
    </HStack>
  );
}

export default Header