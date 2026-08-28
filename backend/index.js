const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const listRoutes = require("./routes/listRoutes");
const itemRoutes = require("./routes/itemRoutes");

const app = express();


connectDB();
app.use(
  cors({
    origin: "https://p-managercart.netlify.app/",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Grocery API is running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/lists", listRoutes);

app.use("/api/items", itemRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  
   console.log(
      `Server running at http://localhost:${PORT}`
    );
});