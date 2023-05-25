const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

app.use('', userRoutes);
app.use('', recipeRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
