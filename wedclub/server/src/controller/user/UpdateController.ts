import { Request, Response } from "express";
import { prisma } from "../../server/http";

export async function handleUpdate(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ Error: "Invalid Request ID" });
    } else {
      const userExists = await prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (!userExists) {
        return res.status(404).json({ Error: "User not found" });
      } else {
        const user = await prisma.user.update({
          where: { id: Number(id) },
          data: {
            ...req.body,
          },
        });

        return res.status(200).json(user);
      }
    }
  } catch (error) {
    return res.status(400).json({ Error: "Error updating user" });
  }
}
