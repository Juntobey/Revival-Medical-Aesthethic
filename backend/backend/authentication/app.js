const express = require("express");
const bodyParser = require("body-parser");
const { register, login } = require("./controllers/authController");

const app = express();
app.use(bodyParser.json());

// Routes
app.post("/register", register);
app.post("/login", login);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
