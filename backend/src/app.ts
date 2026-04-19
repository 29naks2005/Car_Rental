import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "DriveElite API Running 🚀" });
});

app.use("/api", routes);

export default app;
