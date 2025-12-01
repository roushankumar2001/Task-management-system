import { Router } from "express";
import * as TaskController from "../controllers/task.controller";
import { requireAuth } from "../middleware/auth.middleware";
const router = Router();

router.get("/", requireAuth, TaskController.getTasks);
router.post("/", requireAuth, TaskController.createTask);
router.patch("/:id", requireAuth, TaskController.updateTask);
router.delete("/:id", requireAuth, TaskController.deleteTask);
router.patch("/:id/toggle", requireAuth, TaskController.toggleTask);

export default router;
