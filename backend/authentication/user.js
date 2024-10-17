const bcrypt = require('bcryptjs');
const e = require("express");
const {Pool} = require("pg");

const users = []
const saltRounds = 10

const pool = new Pool({
    user:  process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.DB_PORT,
    // Default port
});

const createUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword };
    users.push(user);
    return user;
};

const createUserDB = async (username, password, role = 'user') => {

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await pool.query(
            'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
            [username, hashedPassword, role]
        );
        return result.rows[0];
    }catch (error){
        console.error(`Error creating user: ${error}`)
    }
}

const findUserByUsername = async (username) => {
    try{
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        // console.log(`Please show me the result`);

        console.log("Start of log on function: findUserByUsername")
        console.log(result.rows[0]);

        return result.rows[0];

    }catch (error){
        console.error(`Error when trying to fetch ${username}:`, error)
    }
};

const removeUser = async (id) => {
    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }catch (error){
        console.log(`Encountered following error when trying to remove user: ${id}`)
        console.error(error)
    }
}

const updateUserRole = async(id, role) => {
    try{
        const result = await pool.query(
            'UPDATE users SET role = $1 WHERE id = $2 RETURNING *',
            [role, id]
        );
        return result.rows[0];

    }catch(error){
        console.log(`Encountered following error when trying to update user: ${id}`)
        console.error(error)
    }
}

const updateUser = async(username, role, id ) => {
    try{
        const result = await pool.query(
            'UPDATE users SET username = $1, role = $2 WHERE id = $3 RETURNING *',
            [username, role, id]
        );
        const updatedUser = result.rows[0];
    }catch (error){
        console.log(`Encountered following error when trying to update user: ${username}`)
        console.error(error)
    }

}

const resetPassword = async(username, newPassword) => {
    try{
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        const result = await pool.query(
            'UPDATE users SET password = $1 WHERE username = $2 RETURNING *',
            [hashedPassword, username]
        );
        return result.rows[0];
    }catch(error){
        console.log(`Encountered following error when trying to reset password for: ${username}`)
        console.error(error)
    }
}

module.exports = {
    updateUser,
    resetPassword,
    updateUserRole,
    findUserByUsername,
    removeUser,
    createUserDB
};
