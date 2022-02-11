import { PrismaClient } from "@prisma/client";
import express from "express";
import { router } from "../router";
import path from "path";
import cors from "cors";

const app = express();

const prisma = new PrismaClient();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());
app.use(express.json());
app.use(router);
app.use(
  "/uploads",
  express.static(path.resolve(__dirname, "..", "..", "uploads"))
);

export { app, prisma };
