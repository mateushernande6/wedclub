import { Request, Response } from "express";
import { prisma } from "../../server/http";

export async function handlePost(req: Request, res: Response) {
  try {
    const { name, email } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      res.status(400).json({ Error: "User already exists" });
      throw new Error("User already exists");
    } else {
      const user = await prisma.user.create({
        data: {
          name,
          email,
        },
      });

      return res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
    throw new Error("Invalid Request");
  }
}
