// Import tables in models
const db = require('../models');


// Allows routes to be used outside of this file
module.exports = function (myApp) {

    const Sequelize = require('sequelize');
    const sequelize = new Sequelize('Dealership_db', 'root', 'root', {
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: false,
    });

    
    // Gets dealers from db ordering by name
    myApp.get('/api/GetDealers/', function (req, res) {
        let getDealerQuery = 'SELECT * FROM Dealers ORDER BY name';
        sequelize.query(getDealerQuery,
            { type: sequelize.QueryTypes.SELECT }).then(function (response) {
                res.json(response);
            }).catch(function (error) {
                console.log("AN ERROR OCCURED WHILE FETCHING Dealers");
                console.log(error);
                res.json({ error: error });
            });
    });
    


    // Add dealer information to db 
    myApp.post('/api/AddDealer/:name&:address&:city&:state&:zip&:phone&:phoneExt', function (req, res) {
        console.log("inside of post");
        let addDealerQuery = 'INSERT INTO Dealers (name, address, city, state, zip, phone, phone_ext) VALUES' +
            ' (:name, :address, :city, :state, :zip, :phone,:phoneExt)';
        sequelize.query(addDealerQuery,
            {
                replacements: {
                    name: req.params.name, address: req.params.address, city: req.params.city, state: req.params.state,
                    zip: req.params.zip, phone: req.params.phone, phoneExt: req.params.phoneExt
                },
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

    
    // Update existing dealer in db 
    myApp.put('/api/UpdateDealer/:id&:name&:address&:city&:state&:zip&:phone&:phoneExt', function (req, res) {
        console.log("Made it to update backend");
        let updateDealerQuery = 'UPDATE Dealers SET name = :name, address=:address, city=:city, state=:state, zip=:zip, ' +
            'phone=:phone, phone_ext=:phoneExt WHERE id=:id';
        sequelize.query(updateDealerQuery,
            {
                replacements: {
                    id: req.params.id, name: req.params.name, address: req.params.address, city: req.params.city, state: req.params.state,
                    zip: req.params.zip, phone: req.params.phone, phoneExt: req.params.phoneExt
                },
                type: sequelize.QueryTypes.UPDATE
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
