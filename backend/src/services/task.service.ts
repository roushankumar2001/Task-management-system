import prisma from "../prisma/client";
export const TaskService = {
  getTasks: (userId: number) => prisma.task.findMany({ where: { userId } }),
  createTask: (userId: number, title: string) => prisma.task.create({ data: { userId, title } }),
  updateTask: (id: number, data: any) => prisma.task.update({ where: { id }, data }),
  deleteTask: (id: number) => prisma.task.delete({ where: { id } }),
  toggleTask: async (id: number) => {
    const t = await prisma.task.findUnique({ where: { id } });
    return prisma.task.update({ where: { id }, data: { completed: !t?.completed } });
  }
};
