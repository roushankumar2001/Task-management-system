import bcrypt from "bcryptjs";
export const hashString = (str: string) => bcrypt.hash(str, 10);
export const compareHash = (str: string, hash: string) => bcrypt.compare(str, hash);
