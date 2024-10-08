const sequelize = require('./src/sequalize');
const express = require('express');
const app = express();
const port = 3000;

app.get('/ping', async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    res.status(200).send('Database connection successful!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    res.status(500).send('Database connection failed!');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
