const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
// const router = require("./app/router");
// const sequelize = require("./app/database");

// const User = require("./app/models/userModel");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

var admin = require("firebase-admin");

var serviceAccount = require("../firebase-auth.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post("/signup", async (req, res) => {
  // const user = {
  //   email: req.body.email,
  //   password: req.body.password,
  //   emailVerified: false,
  //   disabled: false,
  // }
  const userResponse = await admin.auth().createUser({
    email: req.body.email,
    password: req.body.password,
    emailVerified: false,
    disabled: false,
  });
  res.json(userResponse);
});

const PORT = process.env.PORT || 1234;
// app.use(router);

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
