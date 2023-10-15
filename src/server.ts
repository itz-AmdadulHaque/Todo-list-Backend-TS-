import dotenv from "dotenv";
// config env
dotenv.config();

import express from "express";
import mongoose from "mongoose";
// import env from "./config/env"
import cors from "cors";
import corsOptions from "./config/corsOptions"
import morgan from "morgan";
import connectDB from "./config/dbConn"
import {
  addTodo,
  completedTodo,
  deleteTodo,
  editTodo,
  getAllTodo,
} from "./controllers/todoController";

const app = express();
const PORT = process.env.PORT || 3000;

// db connection
connectDB();

// logger to log every req & res
app.use(morgan("dev"));

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

app.get("/", getAllTodo);

app.post("/add", addTodo);

app.put("/edit/:id", editTodo);

app.patch("/completed/:id", completedTodo);

app.delete("/delete/:id", deleteTodo);

// handle unknow route
app.all("*", (req, res) => {
  res.status(404).send({
    error: "404 Page Not Found",
  });
});

/* 
"open" event emit when mongoose db connected
good practice to start sever after db connection 
*/
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
