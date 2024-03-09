//server.js
const express = require('express');
const cors = require("cors");
const app = express();
const connectDB = require('../backend/connection/DB');
const dataRoutes = require('../backend/routes/routes');

connectDB();

app.use(cors());
app.use(express.json());
app.use('/app', dataRoutes); // Use '/app' as the base path for data routes

const port = 1000;
app.listen(port, () => console.log(`Server is running at ${port} port!`));
