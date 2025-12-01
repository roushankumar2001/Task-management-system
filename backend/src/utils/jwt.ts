import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const ACCESS = process.env.JWT_ACCESS_SECRET || "accesssecret";
const REFRESH = process.env.JWT_REFRESH_SECRET || "refreshsecret";
const TEMP_REG_SECRET = process.env.TEMP_REG_SECRET || "tempregsecret";

export const signAccess = (data: any) => jwt.sign(data, ACCESS, { expiresIn: "15m" });
export const signRefresh = (data: any) => jwt.sign(data, REFRESH, { expiresIn: "30d" });
export const signTemptoken = (data: any) => jwt.sign(data, TEMP_REG_SECRET, { expiresIn: "10m" });
export const verifyAccess = (token: string) => jwt.verify(token, ACCESS);
export const verifyRefresh = (token: string) => jwt.verify(token, REFRESH);
export const otpverify = (token: string) => jwt.verify(token, TEMP_REG_SECRET);
