import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Box,
  Text,
  useDimensions,
  useDisclosure,
  useTheme,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import { useAuth } from "alethian-app/state/hooks/user.hook";
import { useDispatch } from "react-redux";

const AppLayouts = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const router = useRouter();
  const { token } = useAuth();
  const elementRef = useRef();
  //@ts-ignore
  const dimensions = useDimensions(elementRef);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const btnRef = useRef();
  const { breakpoints } = theme;
  useEffect(() => {}, [dimensions]);
  // const verifyToken = () => {
  //     const decoded: any = jwtDecode(token);
  //     return decoded.exp > Date.now() / 1000;
  // };

  useEffect(() => {
    if (isEmpty(token)) {
      //   if (isLogout) {
      //     dispatch(setPrevRoute({ route: "" }));
      //   } else {
      //     dispatch(setPrevRoute({ route: router.pathname }));
      //   }
      router.push("/login");
    }
  }, [token, router, dispatch]);

  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen:
      dimensions && dimensions.borderBox.width < 768 ? false : true,
  });
  return (
    <Box>
      <Box bg={"secondary.100"}>
        <Text>Navigation</Text>
      </Box>

      <Box p="4" bg="secondary.100">
        {children}
      </Box>
    </Box>
  );
};
export default AppLayouts;
