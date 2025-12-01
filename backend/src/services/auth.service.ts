import prisma from "../prisma/client";
import { hashString, compareHash } from "../utils/hash";
import { signAccess, signRefresh, verifyRefresh, otpverify, signTemptoken } from "../utils/jwt";
import { sendEmailotp } from "../utils/sendemail";
import * as validate from "../utils/validate";


export async function register(data: any) {
  // CASE : OTP Verification second stage
  console.log("Register data:", data);
  if (data.otp && data.temptoken) {
    let decoded;

    try {
      decoded = otpverify(data.temptoken);
    } catch (err) {
      throw { status: 400, message: "Invalid or expired temp token" };
    }

    // verify OTP
    if (String(decoded.otp) !== String(data.otp)) {
      throw { status: 400, message: "Incorrect OTP" };
    }

    // Create final user
    const passwordHash = await hashString(decoded.password);

    const user = await prisma.user.create({
      data: {
        email: decoded.email,
        passwordHash,
        name: decoded.name,
      }
    });

    return {
      message: "Registration completed",
     email: user.email, name: user.name
    };

  }

  // CASE 1: Initial Registration Step (send OTP)
  const { name, email, password } = data;
  if (!name || !email || !password) {
    throw { status: 400, message: "case1 Name, email, password required" };
  }

  // check if user exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw { status: 400, message: "Email already exists" };

  // generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  // temp token
  const tempToken = signTemptoken({ ...data, otp });

  // send email
  await sendEmailotp(email, otp);

  return {
    message: "OTP sent to email",
    tempToken
  };
}







export async function login(data: any) {
  let { email, password } = data;
  if (!email || !password) throw { status: 400, message: "Email and password required" };
  email = validate.Email(email); password = validate.Password(password);
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { status: 401, message: "Invalid credentials" };
  const ok = await compareHash(password, user.passwordHash);
  if (!ok) throw { status: 401, message: "Invalid credentials" };
  const accessToken = signAccess({ userId: user.id, email: user.email });
  const refreshToken = signRefresh({ userId: user.id, email: user.email });
  const refreshHash = await hashString(refreshToken);
  const expiresAt = new Date(Date.now() + 30 * 24 * 3600 * 1000);
  await prisma.refreshToken.create({ data: { tokenHash: refreshHash, userId: user.id, expiresAt } });
  return { user: { id: user.id, email: user.email, name: user.name }, accessToken, refreshToken };
}

export async function RefreshToken(token: string) {
  if (!token) throw { status: 401, message: "No refresh token" };
  let payload: any;
  try { payload = verifyRefresh(token) as any; } catch (e) { throw { status: 401, message: "Invalid refresh token" }; }
  const candidates = await prisma.refreshToken.findMany({ where: { userId: payload.userId, revoked: false } });
  let matched = null;
  for (const c of candidates) {
    const ok = await compareHash(token, c.tokenHash);
    if (ok) { matched = c; break; }
  }
  if (!matched) throw { status: 401, message: "Refresh token not recognized" };
  await prisma.refreshToken.updateMany({ where: { userId: payload.userId }, data: { revoked: true } });
  const newRefresh = signRefresh({ userId: payload.userId, email: payload.email });
  const newHash = await hashString(newRefresh);
  const expiresAt = new Date(Date.now() + 30 * 24 * 3600 * 1000);
  await prisma.refreshToken.create({ data: { tokenHash: newHash, userId: payload.userId, expiresAt } });
  const accessToken = signAccess({ userId: payload.userId, email: payload.email });
  return { accessToken, refreshToken: newRefresh };
}

export async function logout(token: string) {
  if (!token) return;
  const all = await prisma.refreshToken.findMany({});
  for (const rt of all) {
    const ok = await compareHash(token, rt.tokenHash);
    if (ok) {
      await prisma.refreshToken.update({ where: { id: rt.id }, data: { revoked: true } });
    }
  }
  return;
}
export async function me(userId: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw { status: 404, message: "User not found" };
  return { id: user.id, email: user.email, name: user.name };
}
