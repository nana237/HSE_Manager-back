const Certificate = require('../models/Certificate');
const Company = require("../models/Company");

exports.createCertificate = async (req, res) => {
    const {company_id} = req.params;
    const {name, employee_name, certification_date, organism} = req.body;
    const certificate = await Certificate.create({
        company_id,
        name,
        employee_name,
        certification_date,
        organism
    });
    res.json(certificate);
};

exports.getCertificate = async (req, res) => {
    const {company_id, id} = req.params;
    const company = await Company.findByPk(company_id);

    if (!company) {
        return res.status(404).send('Company not found');
    }

    const certificate = await Certificate.findOne({where: {company_id: company_id, id: id}});
    certificate ? res.json(certificate) : res.status(404).send('Certificate not found');
};

exports.deleteCertificate = async (req, res) => {
    const {company_id, id} = req.params;
    const company = await Company.findByPk(company_id);

    if (!company) {
        return res.status(404).send('Company not found');
    }

    const certificate = await Certificate.findOne({where: {company_id: company_id, id: id}});
    if (certificate) {
        await certificate.destroy();
        res.status(200).send('Certificate deleted');
    } else {
        res.status(404).send('Certificate not found');
    }
};
