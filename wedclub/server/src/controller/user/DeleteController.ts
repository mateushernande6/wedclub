import { Request, Response } from "express";
import { prisma } from "../../server/http";

export async function handleDelete(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ Error: "Invalid Request ID" });
    } else {
      // console.log("aqui");
      const userExists = await prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (!userExists) {
        return res.status(404).json({ Error: "User not found" });
      } else {
        const user = await prisma.user.delete({
          where: { id: Number(id) },
        });

        return res.status(204).json(user);
      }
    }
  } catch (error) {
    return res.status(400);
  }
}
