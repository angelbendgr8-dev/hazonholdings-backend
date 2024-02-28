//@ts-nocheck
"use client";

import {
  Flex,
  Box,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link, Icon
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { isEmpty } from "lodash";
import { BiSolidError } from "react-icons/bi";
import Toast from "alethian-app/components/Error";
import { useLoginMutation } from "alethian-app/state/services/auth.service";
import { useRouter } from "next/router";
import { setCredentials } from "alethian-app/state/reducers/auth.reducer";
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie';

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .email("Must be a valid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required "),
});

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const route = useRouter();
  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    formState: { errors, values, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: any) {
    login(values)
      .unwrap()
      .then((payload) => {
        const { data } = payload;

        dispatch(setCredentials({ user: data.user, token: data.access_token }));
        Cookies.set('token', data.access_token);

        route.replace("/dashboard");
      })
      .catch((errors) => {
        console.log(errors);
        const { data } = errors;
        console.log("error", data);
        setErrorMessage(data);
        setShowToast(true);
      });
  }

  return (
    <Flex
      minH={"100vh"}
      width={"100vw"}
      align={"center"}
      justify={"center"}
      flex={1}
      flexDir={"column"}
      bg={useColorModeValue("white", "gray.800")}
    >
      <HStack
        bg={"white"}
        borderBottom={"1px"}
        borderBottomColor={"#CDD5DF"}
        w="100vw"
        py={4}
        justifyContent={"center"}
      >
        <Image
          src="/assets/hazon.png"
          width={45}
          height={45}
          alt="Avatar"
          className="md:w-6 w-20 h-20 md:h-6 rounded-full"
        />
      </HStack>
      <Stack
        spacing={4}
        mx={"auto"}
        mt={4}
        flex={2}
        minW={"sm"}
        maxW={"lg"}
        py={12}
        px={6}
      >
        <Stack align={"center"}>
          <Heading
            className="font-matters"
            fontSize={"24px"}
            fontWeight={"600"}
            textAlign={"center"}
          ></Heading>
          <Text
            className="font-matters"
            fontSize={"20px"}
            fontWeight={"900"}
            mt={2}
            color={"#4B5565"}
          >
            Welcome back !!
          </Text>
        </Stack>
        {showToast && (
          <Toast
            message={errorMessage}
            icon={BiSolidError}
            type="error"
            close={() => setShowToast(false)}
          />
        )}
        <Box
          rounded={"2xl"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          borderTop={"1px"}
          borderTopColor={"#E3E8EF"}
          p={10}
        >
          <Stack spacing={4}>
            <form
              onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
            >
              <Controller
                control={control}
                rules={{
                  maxLength: 100,
                }}
                render={({ field: { onChange, value } }) => (
                  <Box mt={3} id="email">
                    <Text
                      color={"#364152"}
                      fontSize={"14px"}
                      fontWeight={"500"}
                    >
                      Email address
                    </Text>
                    <Input
                      boxShadow={"sm"}
                      focusBorderColor="primary.900"
                      placeholder="kemiade@alethian.com"
                      _placeholder={{
                        color: "gray.50",
                      }}
                      _focus={{
                        borderColor: "primary.900",
                      }}
                      borderColor={
                        isEmpty(errors.username) ? "gray.100" : "error.900"
                      }
                      borderWidth={1}
                      value={value}
                      onChange={onChange}
                      fontSize={"14px"}
                      color={"black.100"}
                    />
                    {errors.username && (
                      <Flex
                        bg={"error.900"}
                        p={2}
                        mt={1}
                        flex={1}
                        flexDir={"row"}
                        gap={2}
                        alignItems={"center"}
                        rounded={"md"}
                      >
                        <Icon color="white" size={4} as={BiSolidError} />
                        <Text
                          className="font-matters"
                          fontWeight={"400"}
                          color="white"
                          fontSize={"small"}
                        >
                          {errors.username && errors.username.message}
                        </Text>
                      </Flex>
                    )}
                  </Box>
                )}
                name="username"
              />
              <Controller
                control={control}
                rules={{
                  maxLength: 100,
                }}
                render={({ field: { onChange, value } }) => (
                  <Box mt={3} id="password">
                    <Text
                      color={"#364152"}
                      fontSize={"14px"}
                      fontWeight={"500"}
                    >
                      Password
                    </Text>
                    <InputGroup>
                      <Input
                        boxShadow={"sm"}
                        _focus={{
                          borderColor: "primary.900",
                        }}
                        borderColor={
                          isEmpty(errors?.password) ? "gray.100" : "error.900"
                        }
                        borderWidth={"0.3x"}
                        value={value}
                        placeholder="*******"
                        _placeholder={{
                          color: "gray.50",
                        }}
                        color={"black.100"}
                        type={showPassword ? "text" : "password"}
                        onChange={(evt) => {
                          onChange(evt.target.value);
                        }}
                      />

                      <InputRightElement px={6} h={"full"}>
                        <Button
                          variant={"ghost"}
                          color={"#697586"}
                          borderWidth={0}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {errors.password && (
                      <Flex
                        bg={"error.900"}
                        p={2}
                        mt={1}
                        flex={1}
                        flexDir={"row"}
                        gap={2}
                        alignItems={"center"}
                        rounded={"md"}
                      >
                        <Icon color="white" size={4} as={BiSolidError} />
                        <Text
                          className="font-matters"
                          fontWeight={"400"}
                          color="white"
                          fontSize={"small"}
                        >
                          {errors.password && errors.password.message}
                        </Text>
                      </Flex>
                    )}
                  </Box>
                )}
                name="password"
              />

              <Stack my={6} spacing={10} pt={2}>
                <Button
                  loadingText="Login"
                  size="lg"
                  isDisabled={!isValid || isLoading}
                  _disabled={{
                    bg: "gray.100",
                    color: "black.150",
                  }}
                  bg="primary.900"
                  color={"white"}
                  isLoading={isLoading}
                  _hover={{
                    opacity: 0.9,
                  }}
                  type="submit"
                  fontWeight={"500"}
                  fontSize={"16px"}
                  borderRadius={10}
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
        <Stack pt={1}>
          <Text
            align={"center"}
            fontSize={"14PX"}
            fontWeight={"400"}
            color={"#4B5565"}
          >
            {" Don't have an account?"}{" "}
            <Link
              _hover={{ color: "primary.900", opacity: 0.8 }}
              color={"primary.900"}
              fontWeight={"500"}
              // href="/register"
              onClick={() => route.replace("/register")}
            >
              Sign up
            </Link>
          </Text>
        </Stack>
      </Stack>
    </Flex>
  );
}
