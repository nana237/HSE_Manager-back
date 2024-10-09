const FirstAidKit = require('../models/FirstAidKit');
const FirstAidKitItem = require('../models/FirstAidKitItem');

exports.getAllKits = async (req, res) => {
    const kits = await FirstAidKit.findAll();
    res.json(kits);
};

exports.getKit = async (req, res) => {
    const {id} = req.params;
    const kit = await FirstAidKit.findByPk(id);
    kit ? res.json(kit) : res.status(404).send('First Aid Kit not found');
};

exports.createKit = async (req, res) => {
    const {name} = req.body;
    const kit = await FirstAidKit.create({name});
    res.json(kit);
};

exports.createKitItem = async (req, res) => {
    const {id} = req.params; // kit ID
    const {name, link} = req.body;
    const kit = await FirstAidKit.findByPk(id);
    if (kit) {
        const item = await FirstAidKitItem.create({name, link, kitId: kit.id});
        res.json(item);
    } else {
        res.status(404).send('First Aid Kit not found');
    }
};

exports.updateKitItem = async (req, res) => {
    const {kitId, itemId} = req.params;
    const {name, link} = req.body;
    const item = await FirstAidKitItem.findOne({where: {id: itemId, kitId}});
    if (item) {
        await item.update({name, link});
        res.json(item);
    } else {
        res.status(404).send('First Aid Kit Item not found');
    }
};

exports.deleteKitItem = async (req, res) => {
    const {kitId, itemId} = req.params;
    const item = await FirstAidKitItem.findOne({where: {id: itemId, kitId}});
    if (item) {
        await item.destroy();
        res.status(200).send('First Aid Kit Item deleted');
    } else {
        res.status(404).send('First Aid Kit Item not found');
    }
};
