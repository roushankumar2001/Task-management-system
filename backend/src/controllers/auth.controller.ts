import { Request, Response, NextFunction } from "express";
import * as AuthService from "../services/auth.service";
import { REFRESH_COOKIE_NAME } from "../config/constants";

export async function register(req:Request,res:Response,next:NextFunction){
  try{
    const user = await AuthService.register(req.body);
    res.json(user);
  }catch(err){ next(err); }
}

export async function login(req:Request,res:Response,next:NextFunction){
  try{
    const { accessToken, refreshToken, user } = await AuthService.login(req.body);
    res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 30 * 24 * 3600 * 1000
    });
    res.json({ accessToken, user });
  }catch(err){ next(err); }
}

export async function refresh(req:Request,res:Response,next:NextFunction){
  try{
    const token = req.cookies[REFRESH_COOKIE_NAME];
    const tokens = await AuthService.RefreshToken(token);
    // set new cookie
    res.cookie(REFRESH_COOKIE_NAME, tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 30 * 24 * 3600 * 1000
    });
    res.json({ accessToken: tokens.accessToken });
  }catch(err){ next(err); }
}

export async function logout(req:Request,res:Response,next:NextFunction){
  try{
    const token = req.cookies[REFRESH_COOKIE_NAME];
    await AuthService.logout(token);
    res.clearCookie(REFRESH_COOKIE_NAME);
    res.json({ success:true });
  }catch(err){ next(err); }
}

export async function me(req:Request,res:Response,next:NextFunction){
  try{
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json({ message: "authorization header missing" });
    const [scheme, token] = authHeader.split(" ");
    if(scheme!=="Bearer"||!token) return res.status(401).json({ message: "Invalid format" });
    const user = await AuthService.me(( (token && (require("../utils/jwt").verifyAccess(token) as any))?.userId) );
    res.json({ user });
  }catch(err){ next(err); }
}
