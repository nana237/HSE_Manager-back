const Alert = require('../models/Alert');
const Company = require('../models/Company');

exports.getAllAlerts = async (req, res) => {
    const {company_id} = req.params;
    const company = Company.findByPk(company_id);

    if (!company) {
        return res.status(404).send('Company not found');
    }
    const alerts = await Alert.findAll({where: {company_id: company_id}});

    res.json(alerts);
};

exports.getAlert = async (req, res) => {
    const {company_id, id} = req.params;
    const company = Company.findByPk(company_id);

    if (!company) {
        return res.status(404).send('Company not found');
    }
    const alerts = await Alert.findOne({where: {company_id: company_id, id: id}});

    res.json(alerts);
}

exports.createAlert = async (req, res) => {
    const {company_id} = req.params;
    const {message, level} = req.body;

    const company = Company.findByPk(company_id);

    if (!company) {
        return res.status(404).send('Company not found');
    }
    if (!message || !level) {
        return res.status(400).send({error: 'Missing required fields'});
    }

    const alert = Alert.create({message, level});

    res.json(alert);
}

exports.deleteAlert = async (req, res) => {
    const {company_id, id} = req.params;
    const company = Company.findByPk(company_id);

    if (!company) {
        return res.status(404).send('Company not found');
    }
    const alert = await Alert.findOne({where: {company_id: company_id, id: id}});

    if (alert) {
        await alert.destroy();
        res.status(200).send('Alert deleted');
    } else {
        res.status(404).send('Alert not found');
    }
}