const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//IMPORTE ROUTES
const authRoute = require('./routes/auth');
const { use } = require('./routes/auth');

//CONNECT TO DB
dotenv.config();
mongoose.connect(process.env.DB_CONNECT, 
() => console.log('Connected to DB'))

//MIDLEWARES
app.use(express.json());

//ROUTESMIDLEWARES
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('Server is up and running'));