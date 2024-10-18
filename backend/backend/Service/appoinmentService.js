const {Pool} = require("pg");
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    user:  process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.DB_PORT,
    // Default port
});

const bookAppointment = async(userId, branchId, dateTime) => {
    try{
        const query = {
            text: 'INSERT INTO appointments(user_id, branch_id, date_time) VALUES($1, $2, $3) RETURNING *',
            values: [userId, branchId, dateTime]
        }

        const result = await pool.query(query);
        return result.rows[0];

    }catch(error){
        console.error("Error booking appointment:", error);
    }
}

const updateAppointment = async(dateTime, id) => {
    try{
        const result = await pool.query(
            'UPDATE appointments SET date_time = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
            [dateTime, id]
        );
        return result.rows[0];
    }catch(error){
        console.error("Error updating appointment:", error);
    }
}

const checkAvailableSlots = async (branchId, date) => {

    try {
        const result = await pool.query(
            'SELECT date_time FROM appointments WHERE branch_id = $1 AND DATE(date_time) = $2',
            [branchId, date]
        );
        return result;
    }catch(error){
        console.error("Error checking available slots:", error);
    }
}

const appointmentHistory = async (userId) => {
    try{
        const result = await pool.query(
            'SELECT * FROM appointments WHERE user_id = $1 ORDER BY date_time DESC',
            [userId]
        );

        return result.rows;
    }catch(error){
        console.error("Error checking appointment history:", error);
    }
}

module.exports = {
    bookAppointment,
    updateAppointment,
    checkAvailableSlots,
    appointmentHistory
}