const Certificate = require('../models/Certificate');
const Company = require("../models/Company");
const authenticateToken = require('../middleware/authMiddleware');

// Create a certificate for a company
exports.createCertificate = [
    authenticateToken,
    async (req, res) => {
        const {company_id} = req.params;
        const {name, employee_name, certification_date, organism} = req.body;

        if (req.user.id !== company_id) {
            return res.status(403).send({error: 'Unauthorized'});
        }

        try {
            const certificate = await Certificate.create({
                company_id,
                name,
                employee_name,
                certification_date,
                organism
            });
            res.json(certificate);
        } catch (error) {
            res.status(500).send({error: 'Server error'});
        }
    }
];

// Get a specific certificate for a company
exports.getCertificate = [
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

        const certificate = await Certificate.findOne({where: {company_id, id}});
        certificate ? res.json(certificate) : res.status(404).send('Certificate not found');
    }
];

// Delete a certificate for a company
exports.deleteCertificate = [
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

        const certificate = await Certificate.findOne({where: {company_id, id}});
        if (certificate) {
            await certificate.destroy();
            res.status(200).send('Certificate deleted');
        } else {
            res.status(404).send('Certificate not found');
        }
    }
];
