const Equipment = require('../models/Equipment');
const Company = require('../models/Company');

exports.getAllEquipment = async (req, res) => {
    const {company_id} = req.params;
    const company = await Company.findByPk(company_id);

    if (!company) {
        return res.status(400).send({error: 'No company found with this id'});
    }

    const equipments = await Equipment.findAll({where: {company_id: company_id}})
    res.json(equipments);
};

exports.getEquipment = async (req, res) => {
    const {company_id, id} = req.params;
    const company = await Company.findByPk(company_id);

    if (!company) {
        return res.status(404).send('Company not found');
    }

    const equipment = await Equipment.findOne({
        where: {id: id, company_id: company_id},
    });

    equipment ? res.json(equipment) : res.status(404).send('Equipment not found');
};

exports.createEquipment = async (req, res) => {
    const {company_id} = req.params;
    const {type, model, name, dateInstallation, dateVerification} = req.body;

    if (!type || !model || !name || !dateInstallation || !dateVerification) {
        return res.status(400).send({error: 'Missing required fields'});
    }

    const equipment = await Equipment.create({type, company_id, model, name, dateInstallation, dateVerification});

    res.json(equipment);
};

exports.updateEquipment = async (req, res) => {
    const {company_id, id} = req.params;
    const {model, name, dateInstallation, dateVerification} = req.body;
    const company = await Company.findByPk(company_id);

    if (!company) {
        return res.status(404).send('Company not found');
    }

    const equipment = await Equipment.findOne({
        where: {id: id, company_id: company_id},
    })

    if (equipment) {
        await equipment.update({model, name, dateInstallation, dateVerification});
        res.json(equipment);
    } else {
        res.status(404).send('Equipment not found');
    }
};

exports.deleteEquipment = async (req, res) => {
    const {company_id, id} = req.params;
    const company = await Company.findByPk(company_id);

    if (!company) {
        return res.status(404).send('Company not found');
    }

    const equipment = await Equipment.findOne({
        where: {id: id, company_id: company_id},
    })

    if (equipment) {
        await equipment.destroy();
        res.status(200).send('Equipment deleted');
    } else {
        res.status(404).send('Equipment not found');
    }
};
