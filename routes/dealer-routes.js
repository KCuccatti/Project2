// Import tables in models
const db = require('../models');

// Allows routes to be used outside of this file
module.exports = function (myApp) {
/*
    const Sequelize = require('sequelize');
    const sequelize = new Sequelize('Dealership_db', 'root', 'root', {
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: false,
    });
*/

    // Gets dealers from db ordering by name
    myApp.get('/api/GetDealers/', function (req, res) {
        let getDealerQuery = 'SELECT * FROM Dealers ORDER BY name';
        db.sequelize.query(getDealerQuery,
            { type: db.sequelize.QueryTypes.SELECT }).then(function (response) {
                res.json(response);
            }).catch(function (error) {
                console.log("AN ERROR OCCURED WHILE FETCHING Dealers");
                console.log(error);
                res.json({ error: error });
            });
    });



    // Add dealer information to db 
    myApp.post('/api/AddDealer/:name&:address&:city&:state&:zip&:phone', function (req, res) {
        console.log("inside of post");
        let addDealerQuery = 'INSERT INTO Dealers (name, address, city, state, zip, phone) VALUES' +
            ' (:name, :address, :city, :state, :zip, :phone)';
        db.sequelize.query(addDealerQuery,
            {
                replacements: {
                    name: req.params.name, address: req.params.address, city: req.params.city, state: req.params.state,
                    zip: req.params.zip, phone: req.params.phone
                },
                type: db.sequelize.QueryTypes.INSERT
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
    myApp.put('/api/UpdateDealer/:id&:name&:address&:city&:state&:zip&:phone', function (req, res) {
        console.log("Made it to update backend");
        let updateDealerQuery = 'UPDATE Dealers SET name = :name, address=:address, city=:city, state=:state, zip=:zip, ' +
            'phone=:phone WHERE id=:id';
        db.sequelize.query(updateDealerQuery,
            {
                replacements: {
                    id: req.params.id, name: req.params.name, address: req.params.address, city: req.params.city, state: req.params.state,
                    zip: req.params.zip, phone: req.params.phone
                },
                type: db.sequelize.QueryTypes.UPDATE
            }
        ).then(function (response) {
            res.json(response);
        }).catch(function (error) {
            console.log("AN ERROR OCCURED WHILE INSERTING DEALER INFO");
            console.log(error);
            res.json({ error: error });
        });
    });

    // Delete existing dealer in db 
    myApp.delete('/api/DeleteDealer/:id', function (req, res) {
        let deleteDealerQuery = 'DELETE FROM Dealers WHERE id=:id';
        db.sequelize.query(deleteDealerQuery,
            {
                replacements: {
                    id: req.params.id,
                },
                type: db.sequelize.QueryTypes.DELETE
            }
        ).then(function (response) {
            res.json(response);
        }).catch(function (error) {
            console.log("AN ERROR OCCURED WHILE DELETING DEALER INFO");
            console.log(error);
            res.json({ error: error });
        });
    });
}