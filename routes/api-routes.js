// Import in models 
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

    // Gets vehicle years from database 
    myApp.get('/api/VehicleYears', function (req, res) {
        let yearQuery = 'SELECT DISTINCT year FROM VehicleModelYear ORDER BY year DESC';
        db.sequelize.query(yearQuery, { type: db.sequelize.QueryTypes.SELECT }
        ).then(function (response) {
            res.json(response);
        }).catch(function (error) {
            console.log("AN ERROR OCCURED WHILE FETCHING AVAILABLE YEARS");
            console.log(error);
            res.json({ error: error });
        });
    });


    // Gets vehicle makes based on vehicle year selected from database
    myApp.get('/api/GetMakesForYear/:year', function (req, res) {
        let makeQuery = 'SELECT DISTINCT make FROM VehicleModelYear WHERE year = :year';
        db.sequelize.query(makeQuery,
            {
                replacements: { year: req.params.year },
                type: db.sequelize.QueryTypes.SELECT
            }
        ).then(function (response) {
            res.json(response);
        }).catch(function (error) {
            console.log("AN ERROR OCCURED WHILE FETCHING MAKES FOR YEAR");
            console.log(error);
            res.json({ error: error });
        });
    });


    // Gets vehicle model based on year and make selected from database
    myApp.get('/api/GetModelsForYearAndMake/:year&:make', function (req, res) {
        console.log("Getting ready to get models from back end and make query call...");
        let modelQuery = 'SELECT DISTINCT model FROM VehicleModelYear WHERE year = :year AND make = :make';
        db.sequelize.query(modelQuery,
            {
                replacements: { year: req.params.year, make: req.params.make },
                type: db.sequelize.QueryTypes.SELECT
            }
        ).then(function (response) {
            res.json(response);
        }).catch(function (error) {
            console.log("AN ERROR OCCURED WHILE FETCHING MODELS FOR YEAR");
            console.log(error);
            res.json({ error: error });
        });
    });


    myApp.get('/api/FindCar/:year&:make&:model&:income', function (req, res) {
        let carQuery = 'SELECT D.name, D.address, D.city, D.state, D.zip, D.phone,' +
            'DI.year, DI.make, DI.model, DI.stock_number, DI.mileage, DI.income, DI.image, DI.price, DI.body_style, DI.engine, DI.transmission ' +
            'FROM DealerInventory AS DI ' +
            '   INNER JOIN Dealers AS D ON DI.dealer_id = D.id ' +
            'WHERE DI.YEAR = :year AND DI.make = :make AND DI.model = :model AND DI.income <= :income ' +
            'ORDER BY D.name';
        db.sequelize.query(carQuery,
            {
                replacements: {
                    year: req.params.year, make: req.params.make, model: req.params.model, income: req.params.income
                },
                type: db.sequelize.QueryTypes.SELECT
            }
        ).then(function (response) {
            res.json(response);
        }).catch(function (error) {
            console.log("AN ERROR OCCURED WHILE GETTING MATCHING VEHICLES WITH USER CRITERIA.");
            console.log(error);
            res.json({ error: error });
        });
    })
}