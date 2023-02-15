const express = require('express');
require("dotenv").config();
const sequelize = require('./db');
const cors = require('cors');
const router = require('./routes/index');
const errorHandlingMiddleware = require('./middleware/ErrorHandlingMiddleware');
const fileUpload = require('express-fileupload');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(fileUpload({}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));
app.use('/api', router);
app.use(errorHandlingMiddleware);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log("Сервер работает на порту " + PORT));
    } catch(e) {
        console.log(e);
    }
}
start();