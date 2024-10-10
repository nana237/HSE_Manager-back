const FirstAidKit = require('../models/FirstAidKit');
const FirstAidKitItem = require('../models/FirstAidKitItem');
const Company = require('../models/Company');
const authenticateToken = require('../middleware/authMiddleware');

// Get all first aid kits for a company
exports.getAllKits = [
    authenticateToken,
    async (req, res) => {
        const {company_id} = req.params;

        if (req.user.id !== company_id) {
            return res.status(403).send({error: 'Unauthorized'});
        }

        const company = await Company.findByPk(company_id);

        if (!company) {
            return res.status(404).send('Company not found');
        }

        const kits = await FirstAidKit.findAll({where: {company_id}});
        res.json(kits);
    }
];

// Get a specific first aid kit for a company
exports.getKit = [
    authenticateToken,
    async (req, res) => {
        const {company_id, id} = req.params;

        if (req.user.id !== company_id) {
            return res.status(403).send({error: 'Unauthorized'});
        }

        const company = await Company.findByPk(company_id);

        if (!company) {
            return res.status(404).send('Company not found');
        }

        const kit = await FirstAidKit.findOne({where: {company_id, id}});

        kit ? res.json(kit) : res.status(404).send('First Aid Kit not found');
    }
];

// Create a first aid kit for a company
exports.createKit = [
    authenticateToken,
    async (req, res) => {
        const {company_id} = req.params;
        const {name} = req.body;

        if (req.user.id !== company_id) {
            return res.status(403).send({error: 'Unauthorized'});
        }

        const company = await Company.findByPk(company_id);

        if (!company) {
            return res.status(404).send('Company not found');
        }
        if (!name) {
            return res.status(400).send({error: 'Missing required fields'});
        }

        const kit = await FirstAidKit.create({company_id, name});
        res.json(kit);
    }
];

// Create an item in a specific first aid kit
exports.createKitItem = [
    authenticateToken,
    async (req, res) => {
        const {company_id, id} = req.params;
        const {name, link} = req.body;

        if (req.user.id !== company_id) {
            return res.status(403).send({error: 'Unauthorized'});
        }

        const company = await Company.findByPk(company_id);

        if (!company) {
            return res.status(404).send('Company not found');
        }

        const kit = await FirstAidKit.findOne({where: {company_id, id}});

        if (kit) {
            const item = await FirstAidKitItem.create({name, link, kitId: kit.id});
            res.json(item);
        } else {
            res.status(404).send('First Aid Kit not found');
        }
    }
];

// Update an item in a first aid kit
exports.updateKitItem = [
    authenticateToken,
    async (req, res) => {
        const {company_id, kitId, itemId} = req.params;
        const {name, link} = req.body;

        if (req.user.id !== company_id) {
            return res.status(403).send({error: 'Unauthorized'});
        }

        const company = await Company.findByPk(company_id);

        if (!company) {
            return res.status(404).send('Company not found');
        }

        const item = await FirstAidKitItem.findOne({where: {company_id, id: itemId, kitId}});

        if (item) {
            await item.update({name, link});
            res.json(item);
        } else {
            res.status(404).send('First Aid Kit Item not found');
        }
    }
];

// Delete an item from a first aid kit
exports.deleteKitItem = [
    authenticateToken,
    async (req, res) => {
        const {company_id, kitId, itemId} = req.params;

        if (req.user.id !== company_id) {
            return res.status(403).send({error: 'Unauthorized'});
        }

        const company = await Company.findByPk(company_id);

        if (!company) {
            return res.status(404).send('Company not found');
        }

        const item = await FirstAidKitItem.findOne({where: {company_id, id: itemId, kitId}});

        if (item) {
            await item.destroy();
            res.status(200).send('First Aid Kit Item deleted');
        } else {
            res.status(404).send('First Aid Kit Item not found');
        }
    }
];
