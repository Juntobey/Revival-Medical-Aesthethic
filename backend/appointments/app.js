const express = require("express");
const bodyParser = require("body-parser");
const { register, login } = require("./controllers/authController");
const cors = require('cors');

const app = express();


app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST']
})); 
app.use(bodyParser.json());

// Routes
app.post("/register", register);
app.post("/login", login);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
