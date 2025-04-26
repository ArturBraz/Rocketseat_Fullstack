import "express-async-errors"; //pega dinamicamente os erros lançados
import express from "express";
import cors from "cors";
import uploadConfig from '@/configs/upload'

import { errorHandling } from "@/middlewares/error-handling";

import { routes } from "./routes";

const app = express();

app.use(cors()); //habilita o CORS
app.use(express.json());

app.use("/uploads", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes); //usa o index routes
app.use(errorHandling); // usa o tratamento de erros

export { app };
