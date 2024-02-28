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
  Link,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/react";
import { BiSolidError } from "react-icons/bi";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { debounce, isEmpty, size } from "lodash";
import {
  useCreateAccountMutation,
  useEmailExistsMutation,
} from "alethian-app/state/services/auth.service";
import { useDispatch } from "react-redux";
import {
  setCredentials
} from "alethian-app/state/reducers/auth.reducer";
import { useRouter } from "next/router";
import { BsCheck } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import Cookies from 'js-cookie';

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("Firs name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Must be a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required ")
    .matches(/^(?=.*[A-Z])/, "One Uppercase")
    .matches(/^(?=.*[a-z])/, "One Lowercase")
    .matches(/^(?=.*[0-9])/, "One Number")
    .matches(/^(?=.*[!@#$%^&*])/, "At least 1 Symbol")
    .matches(/^(?=.{8,})/, "Must Contain 8 Characters"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password Confirmation is required"),
});

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailExist, { isLoading }] = useEmailExistsMutation();
  const route = useRouter();
  const [signUp, { isLoading: signingUp }] = useCreateAccountMutation();
  const [Ierrors, setErrors] = useState<string[]>([]);
  const dispatch = useDispatch();
  const [pErrors] = useState<string[]>([
    "Must Contain 8 Characters",
    "One Uppercase",
    "One Lowercase",
    "One Number",
    "At least 1 Symbol",
  ]);

  const {
    control,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, values, isValid },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  function onSubmit(values: any) {
    signUp(values)
      .unwrap()
      .then(async (payload) => {
        const { data } = payload;

        dispatch(setCredentials({ user: data.user, token: data.access_token }));
        Cookies.set('token',  data.access_token);
        route.replace("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const debouncedEmailValidation = debounce(
    async (val) => {
      if (isEmpty(val)) {
        clearErrors("email");
        return;
      }
      emailExist({ email: val })
        .unwrap()
        .then((payload) => {
          const { data: response } = payload;
          clearErrors("email");
        })
        .catch((errors) => {
          const { data } = errors;
          console.log(data.error);
          setError("email", {
            type: "custom",
            message: data.error,
          });
        });
    },
    1000,
    {
      trailing: true,
    }
  );

  const formatPasswordError = async (password: string) => {
    // console.log(password);
    console.log(values);
    registerSchema
      .validate(
        {
          password: password,
        },
        { abortEarly: false }
      )
      .then((data) => {
        console.log(data);
        setErrors([]);
      })
      .catch((e) => {
        // console.log(e.errors);
        setErrors(e.errors);
      });
  };

  useEffect(() => {
    console.log(Ierrors);
  }, [Ierrors]);

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
      <Stack spacing={4} mx={"auto"} mt={4} flex={2} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading
            className="font-matters"
            fontSize={"24px"}
            fontWeight={"600"}
            textAlign={"center"}
          >
            Create account
          </Heading>
          <Text
            className="font-matters"
            fontSize={"14px"}
            fontWeight={"400"}
            mt={2}
            color={"#4B5565"}
          >
            Get up and running and start booking appointments
          </Text>
        </Stack>
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
              <Stack
                mt={3}
                spacing={4}
                flexDirection={{
                  base: "column",
                  md: "row",
                }}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Controller
                  control={control}
                  rules={{
                    maxLength: 100,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Box width={"full"} id="firstName">
                      <Text
                        color={"#364152"}
                        fontSize={"14px"}
                        fontWeight={"500"}
                      >
                        First Name
                      </Text>
                      <Input
                        boxShadow={"sm"}
                        focusBorderColor="primary.900"
                        borderColor={
                          isEmpty(errors.firstName) ? "gray.100" : "error.900"
                        }
                        borderWidth={1}
                        type="text"
                        value={value}
                        onChange={onChange}
                        placeholder="Kemi"
                        _placeholder={{
                          color: "gray.50",
                        }}
                        color={"black.100"}
                        fontSize={"14px"}
                      />
                    </Box>
                  )}
                  name="firstName"
                />

                <Controller
                  control={control}
                  rules={{
                    maxLength: 100,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Box w={"full"} id="lastName">
                      <Text
                        color={"#364152"}
                        fontSize={"14px"}
                        fontWeight={"500"}
                      >
                        Last Name
                      </Text>
                      <Input
                        boxShadow={"sm"}
                        focusBorderColor="primary.900"
                        borderColor={
                          isEmpty(errors.lastName) ? "gray.100" : "error.900"
                        }
                        borderWidth={1}
                        _placeholder={{
                          color: "gray.50",
                        }}
                        value={value}
                        onChange={onChange}
                        type="text"
                        placeholder="Agbebi"
                        fontSize={"14px"}
                      />
                    </Box>
                  )}
                  name="lastName"
                />
              </Stack>
              <HStack mt={1} justify={"space-between"} spacing={4}>
                <Box w={"50%"}>
                  {errors.firstName && (
                    <Flex
                      bg={"error.900"}
                      p={2}
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
                        {errors.firstName && errors.firstName.message}
                      </Text>
                    </Flex>
                  )}
                </Box>
                <Box w={"50%"}>
                  {errors.lastName && (
                    <Flex
                      bg={"error.900"}
                      p={2}
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
                        {errors.lastName && errors.lastName.message}
                      </Text>
                    </Flex>
                  )}
                </Box>
              </HStack>
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
                    <InputGroup>
                      <Input
                        boxShadow={"sm"}
                        focusBorderColor="primary.900"
                        placeholder="kemiade@alethian.com"
                        borderColor={
                          isEmpty(errors.email) ? "gray.100" : "error.900"
                        }
                        borderWidth={1}
                        _placeholder={{
                          color: "gray.50",
                        }}
                        value={value}
                        onChange={(input: any) => {
                          onChange(input);
                        }}
                        fontSize={"14px"}
                        color={"black.100"}
                      />
                      {isLoading && (
                        <InputRightElement px={6} h={"full"}>
                          <Button
                            variant={"ghost"}
                            color={"#697586"}
                            borderWidth={0}
                            isLoading={isLoading}
                          ></Button>
                        </InputRightElement>
                      )}
                    </InputGroup>
                    {errors.email && (
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
                          {errors.email && errors.email.message}
                        </Text>
                      </Flex>
                    )}
                  </Box>
                )}
                name="email"
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
                        focusBorderColor="primary.900"
                        boxShadow={"sm"}
                        borderColor={
                          isEmpty(errors?.password) ? "gray.100" : "error.900"
                        }
                        borderWidth={1}
                        value={value}
                        _placeholder={{
                          color: "gray.50",
                        }}
                        placeholder="**********"
                        type={showPassword ? "text" : "password"}
                        color={"black.100"}
                        onChange={(evt) => {
                          onChange(evt.target.value);
                          formatPasswordError(evt.target.value);
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

              <Box ml={"1"} display={"flex"} flexDir={"column"}>
                {size(Ierrors) > 1 ? (
                  pErrors.map((item, index) => (
                    <Box
                      key={index}
                      display={"flex"}
                      flexDirection="row"
                      justifyContent={"flex-start"}
                      alignItems="center"
                    >
                      {Ierrors.includes(item) ? (
                        <Icon
                          as={IoMdClose}
                          size={5}
                          borderWidth={1}
                          borderColor={"red.600"}
                          rounded="full"
                          mr="2"
                          color="red.600"
                        />
                      ) : (
                        <Icon
                          as={BsCheck}
                          boxSize={5}
                          borderWidth={1}
                          borderColor={"green.900"}
                          rounded="full"
                          mr="2"
                          color="green.900"
                        />
                      )}
                      <Text
                        color={Ierrors.includes(item) ? "red.600" : "green.900"}
                      >
                        {item}
                      </Text>
                    </Box>
                  ))
                ) : (
                  <Box bg={"red.300"} />
                )}
              </Box>
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
                      Confirm Password
                    </Text>
                    <InputGroup>
                      <Input
                        boxShadow={"sm"}
                        borderColor={
                          isEmpty(errors?.password_confirmation)
                            ? "gray.100"
                            : "error.900"
                        }
                        _focus={{
                          borderColor: "primary.900",
                        }}
                        borderWidth={1}
                        focusBorderColor="primary.900"
                        value={value}
                        onChange={onChange}
                        color={"black.100"}
                        placeholder="**********"
                        _placeholder={{
                          color: "gray.50",
                        }}
                        type={showPassword ? "text" : "password"}
                      />

                      <InputRightElement px={6} h={"full"}>
                        <Button
                          variant={"ghost"}
                          color={"#697586"}
                          borderWidth={0}
                          onClick={() =>
                            setShowPassword(
                              (showComfirmPassword) => !showComfirmPassword
                            )
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>

                    {errors.password_confirmation && (
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
                          {errors.password_confirmation &&
                            errors.password_confirmation.message}
                        </Text>
                      </Flex>
                    )}
                  </Box>
                )}
                name="password_confirmation"
              />
              <Stack my={6} spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  isDisabled={!isValid || signingUp}
                  _disabled={{
                    bg: "gray.100",
                    color: "black.150",
                  }}
                  bg="primary.900"
                  color={"white"}
                  isLoading={signingUp}
                  _hover={{
                    opacity: 0.9,
                  }}
                  type="submit"
                  fontWeight={"500"}
                  fontSize={"16px"}
                  borderRadius={10}
                >
                  Create account
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
            Already have an account?{" "}
            <Link
              _hover={{ color: "primary.900", opacity: 0.8 }}
              color={"primary.900"}
              fontWeight={"500"}
              // href="/"
              onClick={() => route.replace("/")}
            >
              Log in
            </Link>
          </Text>
        </Stack>
      </Stack>
    </Flex>
  );
}
