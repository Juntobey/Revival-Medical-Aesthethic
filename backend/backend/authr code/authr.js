// src/auth.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const pool = require('../database/database')
const { findUserByUsername } = require('./users');

dotenv.config();

const authenticateUser = async (username, password) => {
    const user = await findUserByUsername(username);

    if (!user) {
        throw new Error('User not found');
    }

    //Creates hash of the password being validated and the password obtained from database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    try {
        const token = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: '1h'});
        return {token};
    }catch (error){
        if(error instanceof jwt.JsonWebTokenError){
            return error.message
        }
    }
};

const verifyTokenStillNotExpired = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return error.message
        }
    }
}

module.exports = {
    authenticateUser,
    verifyTokenStillNotExpired
};
