// src/appointments.js

const express = require('express');
const bodyParser = require('body-parser');
const { createUserDB, removeUser, updateUserRole, resetPassword, updateUser} = require('./auth/users');
const { authenticateUser, verifyTokenStillNotExpired } = require('./auth/auth');
const ampq = require("amqplib")


const authentication = express();


authentication.use(bodyParser.json());

const rabbitMQHost = process.env.RABBITMQ_HOST || 'rabbitmq';
const rabbitMQPort = process.env.RABBITMQ_PORT || 5672;

const RABBITMQ_SERVER = `amqp://${rabbitMQHost}:${rabbitMQPort}`;

let channel = null;



// ampq.connect(RABBITMQ_SERVER, (err, connection) => {
//     if(err){
//         // throw err;
//         console.log(`error: ${err}`)
//     }

//     console.log("Please show me what is connection: ", connection)
//     connection.createChannel((err0, ch) => {
//         if(err0){
//             // throw err0;
//             console.log(`error: ${err}`)
//         }
//         const exchange = 'events'
//         ch.assertExchange(exchange, 'direct', {durable: false});


//         channel = ch;
//     })
// })


const connectRabbitMQ = async() => {
    try{
        const connection = await ampq.connect(RABBITMQ_SERVER);
        channel = await connection.createChannel();

        await channel.assertExchange('events', 'direct', {durable: false})

    }catch(error){
        console.error("RabbitMQ connection error:", error)
    }
}


connectRabbitMQ()

authentication.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = await createUserDB(username, password);

        console.log(newUser)

        const event = {type: 'USER_REGISTERED', user: newUser};
        channel.publish('events', 'user.registered', Buffer.from(JSON.stringify(event)))
        console.log('Published event:', event)

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

authentication.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const { token } = await authenticateUser(username, password);

        const user = {username, password};

        const event = {type: 'USER_LOGGED_IN', user: user};
        channel.publish('events', 'user.logged_in', Buffer.from(JSON.stringify(event)))
        console.log('Published event:', event)

        res.status(200).json({ token });
    } catch (error) {
        console.log("Please show me the real reason for this error: ")
        console.error(error)
        res.status(500).json({ message: error.message });
    }
});

authentication.get('/refresh', async(req, res) => {
    try {

        const token = req.headers.authorization; //obtain token from headers
        const result = await verifyTokenStillNotExpired(token);

        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});


// Update User
authentication.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, role } = req.body;

    try {
        const updatedUser = await updateUser(username, role, id);

        const event = { type: 'USER_UPDATED', user: updatedUser };
        channel.publish('events', 'user.updated', Buffer.from(JSON.stringify(event)));

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete User
authentication.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await removeUser(id)

        const event = { type: 'USER_DELETED', user: deletedUser };
        channel.publish('events', 'user.deleted', Buffer.from(JSON.stringify(event)));

        res.status(200).json(deletedUser);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Role Management: Assign and Manage User Roles
authentication.put('/users/:id/role', async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    try {
        const updatedUserRole =  await updateUserRole(id, role);

        const event = { type: 'ROLE_UPDATED', user: updatedUserRole };
        channel.publish('events', 'role.updated', Buffer.from(JSON.stringify(event)));

        res.status(200).json(updatedUserRole);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Password Management: Reset and Recover Passwords
authentication.post('/reset-password', async (req, res) => {
    const { username, newPassword } = req.body;

    try {

        const updatedUser = await resetPassword(username, newPassword);

        const event = { type: 'PASSWORD_RESET', user: updatedUser };
        channel.publish('events', 'password.reset', Buffer.from(JSON.stringify(event)));

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});



authentication.listen(process.env.SERVER_PORT, () => {
    console.log(bodyParser.json())

    console.log(`Server running at http://localhost:${process.env.SERVER_PORT}`);

});