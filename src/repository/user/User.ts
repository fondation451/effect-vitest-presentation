import { generateRandomString } from "../../test/utils/generateRandomString";

export type User = {
  id: string;
  createdAt: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const generateUser = (partialUser: Partial<User>): User => ({
  id: generateRandomString(),
  createdAt: generateRandomString(),
  email: generateRandomString(),
  password: generateRandomString(),
  firstName: generateRandomString(),
  lastName: generateRandomString(),
  ...partialUser,
});
