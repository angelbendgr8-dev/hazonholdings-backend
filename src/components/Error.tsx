import React from "react";
import { Box, Icon, IconButton, Text } from "@chakra-ui/react";
import { CgClose } from "react-icons/cg";
import { IoMdCloseCircle } from "react-icons/io";

type Props = {
  icon: any;
  type: string;
  message: string;
  close: ()=> void
};
const Toast = ({ icon, type, message,close }: Props) => {
  return (
    <Box
      bg={type === "error" ? "red.500" : "green"}
      p={2}
      display={"flex"}
      flexDir={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      rounded={"md"}
    >
      <Box
        flex={1}
        display={"flex"}
        flexDir={"row"}
        gap={2}
        alignItems={"center"}
      >
        <Icon color="white" size={4} as={icon} />
        <Text className="font-matters" fontWeight={"400"} color="white">
          {message}
        </Text>
      </Box>
      <IconButton
        onClick={close}
        aria-label="close toast"
        size={'xs'}
        borderWidth={0}
        color={"white"}
        as={IoMdCloseCircle}
      />
    </Box>
  );
};

export default Toast;
