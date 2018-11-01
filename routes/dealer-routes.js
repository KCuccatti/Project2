// Import tables in models
const db = require('../models');


// Allows routes to be used outside of this file
module.exports = function (app) {
    
    const Sequelize = require('sequelize');
    const sequelize = new Sequelize('Dealership_db', 'root', 'root', {
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: false,
    });




    // Add dealer information to db
    app.post('/api/AddDealer/:name&:address&:city&:state&:zip&:phone&:phoneExt', function (req, res) {
        console.log("inside of post");
        let addDealerQuery = 'INSERT INTO Dealers (name, address, city, state, zip, phone, phone_ext) VALUES (:name, :address, :city, :state, :zip, :phone,:phoneExt)';
        sequelize.query(addDealerQuery,
            {
                replacements: { name: req.params.name, address: req.params.address, city: req.params.city, state: req.params.state,
                zip: req.params.zip, phone: req.params.phone, phoneExt: req.params.phoneExt},
                type: sequelize.QueryTypes.INSERT
            }
        ).then(function (response) {
            res.json(response);
        }).catch(function (error) {
            console.log("AN ERROR OCCURED WHILE INSERTING DEALER INFO");
            console.log(error);
            res.json({ error: error });
        });
    });
}