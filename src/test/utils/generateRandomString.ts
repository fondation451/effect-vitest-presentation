import * as crypto from "node:crypto";

export const generateRandomString = (length = 10): string => {
  return crypto.randomBytes(length).toString("hex");
};
