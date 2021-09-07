import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import indexRoutes from "./routes";
import postRoutes from "./routes/post";

const app = express();

app.use(express.json());
app.use("/users", indexRoutes);
app.use("/posts", postRoutes);

createConnection()
  .then(async (connection) => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Server started on port ${port}`));
  })
  .catch((error) => console.log(error));
