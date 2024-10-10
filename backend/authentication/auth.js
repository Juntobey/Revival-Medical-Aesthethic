// src/auth api's.js

const express = require('express');
const bodyParser = require('body-parser');
const { createUser } = require('./auth/users');
const { authenticateUser, verifyTokenStillNotExpired } = require('./auth/auth');

const { pool } = require('./database/database')


const app = express();

app.use(bodyParser.json());


const testDatabase = () => {

    console.log('Please show me the database connection', pool);
}
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await createUser(username, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const { token } = await authenticateUser(username, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

app.get('/refresh', async(req, res) => {
    try {

        const token = req.headers.authorization; //obtain token from headers
        const result = await verifyTokenStillNotExpired(token);

        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});



app.listen(process.env.SERVER_PORT, () => {
    console.log(bodyParser.json())

    console.log(`Server running at http://localhost:${process.env.SERVER_PORT}`);

    console.log("please show me what's inside this guy", pool)
});
