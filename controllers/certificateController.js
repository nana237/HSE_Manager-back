const Certificate = require('../models/Certificate');

exports.createCertificate = async (req, res) => {
    const {company_id, name, employee_name, certification_date, organism} = req.body;
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
    const {id} = req.params;
    const certificate = await Certificate.findByPk(id);
    certificate ? res.json(certificate) : res.status(404).send('Certificate not found');
};

exports.deleteCertificate = async (req, res) => {
    const {id} = req.params;
    const certificate = await Certificate.findByPk(id);
    if (certificate) {
        await certificate.destroy();
        res.status(200).send('Certificate deleted');
    } else {
        res.status(404).send('Certificate not found');
    }
};
