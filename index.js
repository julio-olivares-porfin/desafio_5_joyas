import express from "express";
import "dotenv/config";
import router from "./routes/joyasRoutes.js";

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.json());
app.use("/", router);

app.get("*", (req, res) => {
  res.status(404).send("Esta ruta no existe");
});

app.listen(PORT, () => {
  console.log(`Servidor encendido en http://localhost:${PORT} `);
});