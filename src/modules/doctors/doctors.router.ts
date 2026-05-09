import express, { Router } from "express";
import { createDoctorController, doctors } from "./doctors.controller";
import { authMiddleware, roleMiddleware } from '../../middlewares/auth.middleware'

export const docRouter = Router()

docRouter.get("/doctors", doctors);
docRouter.post('/new', authMiddleware, roleMiddleware('admin'), createDoctorController)