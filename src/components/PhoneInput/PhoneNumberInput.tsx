import React, { useState, useEffect } from "react";

import { AsYouType } from "libphonenumber-js";
import { getCountryTelCode } from "./countries";
import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
} from "@chakra-ui/react";
type Props = {
  size: any;
  value: any;
  country: any;
  options: any;
  onChange: any;
  placeholder: string;
};
export default function PhoneNumberInput({
  size,
  value,
  country,
  options,
  onChange,
  placeholder,
  ...rest
}: Props) {
  let [number, setNumber] = useState(value || "");
  let [selectedCountry, setSelectedCountry] = useState(country || "");
  let [countryCode, setCountryCode] = useState(
    getCountryTelCode(country) || ""
  );

  useEffect(() => {
    setSelectedCountry(country);
    setCountryCode(getCountryTelCode(country));
  }, [country]);

  const onCountryChange = (e: any) => {
    let value = e.target.value;
    let code = getCountryTelCode(value);
    console.log(value);
    let parsedNumber = new AsYouType().input(`${code}${number}`);

    setCountryCode(code);
    setSelectedCountry(value);
    onChange(parsedNumber);
  };

  const onPhoneNumberChange = (e: any) => {
    let value = e.target.value;
    let parsedNumber = new AsYouType().input(`${countryCode}${value}`);

    setNumber(value);
    onChange(parsedNumber);
  };

  return (
    <InputGroup size={size} {...rest}>
      <InputLeftElement flex={1} width="5rem">
        <Select
          top="0"
          left="0"
          right="0"
          my="auto"
          zIndex={1}
          bottom={0}
          opacity={0}
          height="100%"
          bg="green.600"
          position="absolute"
          value={selectedCountry}
          onChange={onCountryChange}
        >
          <option value="" />
          {options.map((option: any, index: number) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <Flex pl={2} width="100%" alignItems="center">
          {selectedCountry && (
            <Box mr="4px" width="50%" flex={1}>
              <Text
                fontWeight={"400"}
                className="font-matters"
                color={"black.100"}
              >
                {countryCode}
              </Text>
            </Box>
          )}
        </Flex>
      </InputLeftElement>
      <Input
        pl="5.2rem"
        type="tel"
        value={number}
        pattern="[0-9]"
        placeholder={placeholder}
        onChange={onPhoneNumberChange}
      />
    </InputGroup>
  );
}

PhoneNumberInput.defaultProps = {
  options: [],
  size: "md",
};
