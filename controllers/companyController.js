const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Company = require('../models/Company');

exports.createCompany = async (req, res) => {
    try {
        const {name, mail, password} = req.body;
        const hashed_password = await bcrypt.hash(password, 10);
        await Company.create({name, mail, password: hashed_password});
        res.status(200).send('Company created');
    } catch (error) {
        console.error('Error creating company:', error);
        res.status(500).send('Error creating company');
    }
};

exports.getCompanies = async (req, res) => {
    const companies = await Company.findAll();
    companies ? res.json(companies) : res.status(404).send('Company not found');
};

exports.updateCompany = async (req, res) => {
    const {id} = req.params;
    const {name, mail, password, nb_employees} = req.body;
    const company = await Company.findByPk(id);

    if (company) {
        await company.update({name, mail, password, nb_employees});
        res.json(company);
    } else {
        res.status(404).send('Company not found');
    }
};

exports.loginCompany = async (req, res) => {
    const {email, password} = req.body;
    const company = await Company.findByPk(email);

    if (!company) {
        return res.status(400).send('Invalid email');
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) return res.status(400).send('Invalid password');

    const token = jwt.sign({id: company.id}, process.env.SECRET, {expiresIn: '1h'});
    res.json({token});
};
