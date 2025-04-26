import { SessionsController } from "@/controllers/sessions-controller";
import { Router } from "express";


const sessionsRoutes = Router()

const sessionsController = new SessionsController() //instance

sessionsRoutes.post("/", sessionsController.create)


export {sessionsRoutes}