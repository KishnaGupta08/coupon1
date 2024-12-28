require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const couponRoutes = require("./routes/couponRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
connectDB();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/coupons", couponRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
