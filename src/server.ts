import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import { docRouter } from "./modules/doctors/doctors.router";


const app = express();
const port = process.env.PORT;
app.use(express.json())
app.use(cors());


app.use("/med", docRouter)


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
