import { Request, Response, NextFunction } from "express";
import { TaskService } from "../services/task.service";

export async function getTasks(req:Request,res:Response,next:NextFunction){
  try{
    const userId = (req as any).user.userId;
    const data = await TaskService.getTasks(userId);
    res.json(data);
  }catch(err){ next(err); }
}

export async function createTask(req:Request,res:Response,next:NextFunction){
  try{
    const userId = (req as any).user.userId;
    const data = await TaskService.createTask(userId, req.body.title);
    res.json(data);
  }catch(err){ next(err); }
}

export async function updateTask(req:Request,res:Response,next:NextFunction){
  try{
    const data = await TaskService.updateTask(Number(req.params.id), req.body);
    res.json(data);
  }catch(err){ next(err); }
}

export async function deleteTask(req:Request,res:Response,next:NextFunction){
  try{
    await TaskService.deleteTask(Number(req.params.id));
    res.json({ success:true });
  }catch(err){ next(err); }
}

export async function toggleTask(req:Request,res:Response,next:NextFunction){
  try{
    const data = await TaskService.toggleTask(Number(req.params.id));
    res.json(data);
  }catch(err){ next(err); }
}
