const express = require("express");
app = express();
const cors = require("cors");
const dotenv = require("dotenv")
dotenv.config()

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(err));

const user = require("./routes/user");
const login = require("./routes/login");
const feedback = require("./routes/feedback");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization","x-auth-token"],
    methods:["GET", "POST", "PUT", "PATCH","DELETE"]
  })
);
app.use("/api/users", user);
app.use("/api/login", login);
app.use("/api/feedback", feedback);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
