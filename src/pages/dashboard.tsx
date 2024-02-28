import { Box, Text } from "@chakra-ui/react";
import Header from "alethian-app/components/Header";
import React, { useEffect, useState } from "react";
import { socket } from "../socket";
import { useAuth } from "alethian-app/state/hooks/user.hook";

const dashboard = () => {
  const { user } = useAuth();
  const [socketInfo, setSocketInfo] = useState<any>({})
  useEffect(() => {
    socket.connect();
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("identity", user._id, (response: any) => {
        // console.log("identity", response);
        setSocketInfo(response);
      });
    });
  }, []);

  return (
    <Box>
      <Header />
      <Text textAlign={'center'} margin={'20'}>Welcome to hazonHoldings {socketInfo?.firstName} {socketInfo.lastName}</Text>
    </Box>
  );
};

export default dashboard;
