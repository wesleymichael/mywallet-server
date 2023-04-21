import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 8000;
app.listen(`${PORT}`, () => console.log(`Server running on port ${PORT}`));
