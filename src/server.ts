import express from "express";
import medRouter from "./medRouters/med.routers";
import "dotenv/config";
import cors from "cors";


const app = express();
const port = process.env.PORT;
app.use(express.json())
app.use(cors());


app.use("/med", medRouter)


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
