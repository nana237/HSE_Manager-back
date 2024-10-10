const Equipment = require('../models/Equipment');
const Company = require('../models/Company');
const authenticateToken = require('../middleware/authMiddleware');

// Get all equipment for a company
exports.getAllEquipment = [
    authenticateToken,
    async (req, res) => {
        const {company_id} = req.params;

        if (req.user.id !== company_id) {
            return res.status(403).send({error: 'Unauthorized'});
        }

        const company = await Company.findByPk(company_id);

        if (!company) {
            return res.status(400).send({error: 'No company found with this id'});
        }

        const equipments = await Equipment.findAll({where: {company_id}});
        res.json(equipments);
    }
];

// Get specific equipment for a company
exports.getEquipment = [
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

        const equipment = await Equipment.findOne({
            where: {id, company_id}
        });

        equipment ? res.json(equipment) : res.status(404).send('Equipment not found');
    }
];

// Create new equipment for a company
exports.createEquipment = [
    authenticateToken,
    async (req, res) => {
        const {company_id} = req.params;
        const {type, model, name, dateInstallation, dateVerification} = req.body;

        if (!type || !model || !name || !dateInstallation || !dateVerification) {
            return res.status(400).send({error: 'Missing required fields'});
        }

        if (req.user.id !== company_id) {
            return res.status(403).send({error: 'Unauthorized'});
        }

        try {
            const equipment = await Equipment.create({
                type,
                company_id,
                model,
                name,
                dateInstallation,
                dateVerification
            });
            res.json(equipment);
        } catch (error) {
            res.status(500).send({error: 'Server error'});
        }
    }
];

// Update equipment for a company
exports.updateEquipment = [
    authenticateToken,
    async (req, res) => {
        const {company_id, id} = req.params;
        const {model, name, dateInstallation, dateVerification} = req.body;

        if (req.user.id !== company_id) {
            return res.status(403).send({error: 'Unauthorized'});
        }

        const company = await Company.findByPk(company_id);

        if (!company) {
            return res.status(404).send('Company not found');
        }

        const equipment = await Equipment.findOne({
            where: {id, company_id}
        });

        if (equipment) {
            await equipment.update({model, name, dateInstallation, dateVerification});
            res.json(equipment);
        } else {
            res.status(404).send('Equipment not found');
        }
    }
];

// Delete equipment for a company
exports.deleteEquipment = [
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

        const equipment = await Equipment.findOne({
            where: {id, company_id}
        });

        if (equipment) {
            await equipment.destroy();
            res.status(200).send('Equipment deleted');
        } else {
            res.status(404).send('Equipment not found');
        }
    }
];
