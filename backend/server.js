const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const customerRoutes = require("./routes/customers");
const authRoutes = require("./routes/auth");
const milkRoutes = require("./routes/milk");
const salesRoutes = require("./routes/sales");
const connectDB = require("./config/db");
const { errorHandler, notFound } = require("./middleware/errorHandler");

dotenv.config({ path: "./config/config.env" });

const app = express();

connectDB();

app.use(express.json());

app.use(cookieParser());

app.use("/api/customers", customerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/milk", milkRoutes);
app.use("/api/sales", salesRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
