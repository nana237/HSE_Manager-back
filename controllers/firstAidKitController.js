const FirstAidKit = require('../models/FirstAidKit');
const FirstAidKitItem = require('../models/FirstAidKitItem');
const Company = require('../models/Company');

exports.getAllKits = async (req, res) => {
    const {company_id} = req.params;
    const company = await Company.findByPk(company_id);

    if (!company) {
        return res.status(404).send('Company not found');
    }

    const kits = await FirstAidKit.findAll({where: {company_id: company_id}});

    res.json(kits);
};

exports.getKit = async (req, res) => {
    const {company_id, id} = req.params;
    const company = await Company.findByPk(company_id);

    if (!company) {
        return res.status(404).send('Company not found');
    }

    const kit = await FirstAidKit.findOne({where: {company_id: company_id, id: id}});

    res.json(kit);
};

exports.createKit = async (req, res) => {
    const {company_id} = req.params;
    const {name} = req.body;

    const company = await Company.findByPk(company_id);

    if (!company) {
        return res.status(404).send('Company not found');
    }
    if (!name) {
        return res.status(400).send({error: 'Missing required fields'});
    }

    const kit = await FirstAidKit.create({company_id, name});

    res.json(kit);
};

exports.createKitItem = async (req, res) => {
    const {company_id, id} = req.params;
    const {name, link} = req.body;
    const company = await Company.findByPk(company_id);

    if (!company) {
        return res.status(404).send('Company not found');
    }

    const kit = await FirstAidKit.findOne({where: {company_id: company_id, id: id}});

    if (kit) {
        const item = await FirstAidKitItem.create({name, link, kitId: kit.id});
        res.json(item);
    } else {
        res.status(404).send('First Aid Kit not found');
    }
};

exports.updateKitItem = async (req, res) => {
    const {company_id, kitId, itemId} = req.params;
    const {name, link} = req.body;
    const company = await Company.findByPk(company_id);

    if (!company) {
        return res.status(404).send('Company not found');
    }
    const item = await FirstAidKitItem.findOne({where: {company_id: company_id, id: itemId, kitId}});
    if (item) {
        await item.update({name, link});
        res.json(item);
    } else {
        res.status(404).send('First Aid Kit Item not found');
    }
};

exports.deleteKitItem = async (req, res) => {
    const {company_id, kitId, itemId} = req.params;
    const company = await Company.findByPk(company_id);

    if (!company) {
        return res.status(404).send('Company not found');
    }

    const item = await FirstAidKitItem.findOne({where: {company_id: company_id, id: itemId, kitId}});
    if (item) {
        await item.destroy();
        res.status(200).send('First Aid Kit Item deleted');
    } else {
        res.status(404).send('First Aid Kit Item not found');
    }
};
