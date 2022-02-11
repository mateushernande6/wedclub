import { Request, Response } from "express";
import { prisma } from "../../server/http";

export async function handleGet(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (id) {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (user) {
        return res.status(200).json(user);
      } else {
        res.status(404).json({ Error: "User not found" });
        throw new Error("User not found");
      }
    } else {
      const users = await prisma.user.findMany();

      return res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ Error: "User not found" });
    throw new Error("User not found");
  }
}
