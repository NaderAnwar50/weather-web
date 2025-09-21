import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// API endpoint to securely provide config
app.get("/api/config", (req, res) => {
  res.json({
    apiKey: process.env.API_KEY,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
