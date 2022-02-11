import { atom } from "recoil";

interface IUser {
  email: string;
  id: number;
  img: string;
  img_name: string;
  name: string;
}

export const userInfo = atom({
  key: "userInfo", // unique ID (with respect to other atoms/selectors)
  default: {} as IUser, // default value (aka initial value)
});
