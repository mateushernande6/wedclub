import { Router } from "express";
import { handleGet } from "./controller/user/GetController";
import { handlePost } from "./controller/user/PostController";
import { handleDelete } from "./controller/user/DeleteController";
import { handleUpdate } from "./controller/user/UpdateController";
import { handleUpload } from "./controller/user/UploadController";
// import uploads from "./services/uploads";

import multerConfig from "./config/multer";
import multer from "multer";

const router = Router();

const upload = multer(multerConfig);

router.get("/user", (req, res) => {
  handleGet(req, res);
});

router.get("/user/:id", (req, res) => {
  handleGet(req, res);
});

router.post("/user", (req, res) => {
  handlePost(req, res);
});

router.put("/user/upload/:id", upload.single("profile"), (req, res) => {
  handleUpload(req, res);
});

router.delete("/user/:id", (req, res) => {
  handleDelete(req, res);
});

router.put("/user/:id", (req, res) => {
  handleUpdate(req, res);
});

export { router };
