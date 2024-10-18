const express = require("express");
const bodyParser = require("body-parser");
const { register, login } = require("./controllers/authController");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

// Allow cross-origin requests from any origin
app.use(cors()); // This will allow requests from all origins

// If you want to be more specific and allow only the frontend
// app.use(cors({ origin: 'http://localhost:3001' }));

app.use(express.json());

// Routes
app.post("/register", register);
app.post("/login", login);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
