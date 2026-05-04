import express from "express";
import { doctors } from "./doctors.controller";


export const docRouter = express.Router();

docRouter.get("/doctor", doctors);
