import { SelectData } from "alethian-app/components/Select";

export const getBaseUrl = () => {
  return "http://localhost:25000/";
};
export function currencyFormat(num: any) {
  return (
    "\u20A6" +
    Number(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  );
}

export const genderData: SelectData[] = [
  {
    id: 0,
    title: 'Male',
    value: "Male"
  },
  {
    id: 1,
    title: 'Female',
    value: "Female"
  },
  {
    id: 2,
    title: 'Others',
    value: "Others"
  },
]
export const insuranceData: SelectData[] = [
  {
    id: 0,
    title: 'No insurance, self pay instead',
    value: "Self payment"
  },
  {
    id: 1,
    title: 'Insurance 1',
    value: "insurance 1"
  },
  {
    id: 2,
    title: 'Insurance 2',
    value: "Insurance 2"
  },
  {
    id: 2,
    title: 'Insurance',
    value: "Insurance"
  },
]
export const phoneType: SelectData[] = [
  {
    id: 0,
    title: 'Mobile',
    value: "mobile"
  },
  {
    id: 1,
    title: 'Home',
    value: "home"
  },
  {
    id: 2,
    title: 'Work',
    value: "work"
  }
]
