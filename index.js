const express = require('express');
const sequelize = require('./config/sequelize');
const companyRoutes = require('./routes/companyRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const firstAidRoutes = require('./routes/firstAidKitRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const alertRoutes = require('./routes/alertRoutes');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');
const swaggerDocument = YAML.parse(fs.readFileSync('Documentation/swagger.yaml', 'utf8'));

const cors = require('cors');


require('dotenv').config();

const app = express();
const port = 3000;


app.use(cors({
    origin: 'http://localhost:8080'
  }));
  

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/ping', async (req, res) => {
    try {
        await sequelize.authenticate();
        console.log('Database connection successful');
        res.status(200).send('Database connection successful!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        res.status(500).send('Database connection failed!');
    }
});

// Use the defined routes
app.use('/company', companyRoutes);
app.use('/equipment', equipmentRoutes);
app.use('/first-aid', firstAidRoutes);
app.use('/certificate', certificateRoutes);
app.use('/alert', alertRoutes);

// Start the server
app.listen(port, async () => {
    try {
        await sequelize.sync({force: false, alter: true});
        console.log('Database synced successfully');
        console.log(`Server running on http://localhost:${port}`);
    } catch (error) {
        console.error('Unable to sync the database:', error);
    }
});
