const express = require('express');
const sequelize = require('./sequelize');
const Equipment = require('./models/Equipment');
const FirstAidKit = require('./models/FirstAidKit');
const FirstAidKitItem = require('./models/FirstAidKitItem');
const Alert = require('./models/Alert');

const app = express();
const port = 3000;

app.use(express.json());

// Connect to the database
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

// Equipment Routes
app.get('/equipment/get-all', async (req, res) => {
    const equipment = await Equipment.findAll();
    res.json(equipment);
});

app.get('/equipment/get/:id', async (req, res) => {
    const { id } = req.params;
    const equipment = await Equipment.findByPk(id);
    if (equipment) {
        res.json(equipment);
    } else {
        res.status(404).send('Equipment not found');
    }
});

app.post('/equipment/create', async (req, res) => {
    const { type, model, name, dateInstallation, dateVerification } = req.body;
    const equipment = await Equipment.create({ type, model, name, dateInstallation, dateVerification });
    res.json(equipment);
});

app.post('/equipment/update/:id', async (req, res) => {
    const { id } = req.params;
    const { model, name, dateInstallation, dateVerification } = req.body;
    const equipment = await Equipment.findByPk(id);
    if (equipment) {
        await equipment.update({ model, name, dateInstallation, dateVerification });
        res.json(equipment);
    } else {
        res.status(404).send('Equipment not found');
    }
});

app.post('/equipment/delete/:id', async (req, res) => {
    const { id } = req.params;
    const equipment = await Equipment.findByPk(id);
    if (equipment) {
        await equipment.destroy();
        res.status(200).send('Equipment deleted');
    } else {
        res.status(404).send('Equipment not found');
    }
});

// First Aid Kit Routes
app.get('/first-aid/get-all', async (req, res) => {
    const kits = await FirstAidKit.findAll();
    res.json(kits);
});

app.get('/first-aid/get/:id', async (req, res) => {
    const { id } = req.params;
    const kit = await FirstAidKit.findByPk(id);
    if (kit) {
        res.json(kit);
    } else {
        res.status(404).send('First Aid Kit not found');
    }
});

app.post('/first-aid/create', async (req, res) => {
    const { name } = req.body;
    const kit = await FirstAidKit.create({ name });
    res.json(kit);
});

app.post('/first-aid/item/create/:id', async (req, res) => {
    const { id } = req.params;
    const { name, link, quantity } = req.body;
    const kit = await FirstAidKit.findByPk(id);
    if (kit) {
        const item = await FirstAidKitItem.create({ name, link, quantity, kitId: kit.id });
        res.json(item);
    } else {
        res.status(404).send('First Aid Kit not found');
    }
});

app.post('/first-aid/update/:kitId/:itemId', async (req, res) => {
    const { kitId, itemId } = req.params;
    const { name, link, quantity } = req.body;
    const item = await FirstAidKitItem.findOne({ where: { id: itemId, kitId } });
    if (item) {
        await item.update({ name, link, quantity });
        res.json(item);
    } else {
        res.status(404).send('First Aid Kit Item not found');
    }
});

app.post('/first-aid/delete/:kitId/:itemId', async (req, res) => {
    const { kitId, itemId } = req.params;
    const item = await FirstAidKitItem.findOne({ where: { id: itemId, kitId } });
    if (item) {
        await item.destroy();
        res.status(200).send('First Aid Kit Item deleted');
    } else {
        res.status(404).send('First Aid Kit Item not found');
    }
});

// Alert Routes
app.get('/alert/get-all', async (req, res) => {
    const alerts = await Alert.findAll();
    res.json(alerts);
});

// Start the server
app.listen(port, async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('Database synced successfully');
        console.log(`Server running on http://localhost:${port}`);
    } catch (error) {
        console.error('Unable to sync the database:', error);
    }
});
