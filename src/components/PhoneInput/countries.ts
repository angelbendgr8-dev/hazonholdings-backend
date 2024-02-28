// @ts-nocheck
import sc from "states-cities-db";

const COUNTRIES = sc.getCountries();

const getCountryTelCode = (country: any) =>
  country && COUNTRIES.find(({ iso }) => iso === country).prefix;

export { COUNTRIES, getCountryTelCode };
