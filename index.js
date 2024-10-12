const express = require("express");
require("dotenv").config();
const { ClerkExpressWithAuth } = require("@clerk/clerk-sdk-node");
const userRoutes = require("./routes/userRoutes");
const connectDb = require("./utils/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(ClerkExpressWithAuth());
app.use(cookieParser);
app.use(
  cors({
    origin: ["http://localhost:5173/"],
    methods: ["GET", "POST"],
  })
);
connectDb();

app.use("/api/v1/", userRoutes);

const PORT = process.env.PORT || 8000;

app.listen(() => {
  console.log(`Port is running on: ${PORT}`);
});
