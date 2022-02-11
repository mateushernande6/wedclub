import { Request, Response } from "express";
import { prisma } from "../../server/http";

export async function handleUpload(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const file = req.file;

    if (!id) {
      return res.status(400);
    } else {
      const userExists = await prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (!userExists) {
        return res.status(404).json({ Error: "User not found" });
      } else {
        if (!req.file) {
          return res.status(400).json({ Error: "Please upload file" });
        } else {
          const userUpload = await prisma.user.update({
            where: { id: Number(id) },
            data: {
              img: `http://localhost:8000/uploads/${req.file?.filename}`,
              img_name: req.file?.originalname,
            },
          });

          return res.status(200).json(userUpload);
        }
      }
    }

    // console.log(`http://localhost:8000/${req.file?.path}`);

    // console.log(req.file);
    // res.json({ teste: `Upload sucess ${req.file?.filename}` });
  } catch (error) {
    res.status(400).json({ Error: "Bad request" });
  }
}
