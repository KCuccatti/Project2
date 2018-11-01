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


    // Gets vehicle years from database 
    app.get('/api/VehicleYears', function (req, res) {
        let yearQuery = 'SELECT DISTINCT year FROM VehicleModelYear ORDER BY year DESC';
        sequelize.query(yearQuery, { type: sequelize.QueryTypes.SELECT }
        ).then(function (response) {
            res.json(response);
        }).catch(function (error) {
            console.log("AN ERROR OCCURED WHILE FETCHING AVAILABLE YEARS");
            console.log(error);
            res.json({ error: error });
        });
    });


    // Gets vehicle makes based on vehicle year selected from database
    app.get('/api/GetMakesForYear/:year', function (req, res) {
        let makeQuery = 'SELECT DISTINCT make FROM VehicleModelYear WHERE year = :year';
        sequelize.query(makeQuery,
            {
                replacements: { year: req.params.year },
                type: sequelize.QueryTypes.SELECT
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
    app.get('/api/GetModelsForYearAndMake/:year&:make', function (req, res) {
        console.log("Getting ready to get models from back end and make query call...");
        let modelQuery = 'SELECT DISTINCT model FROM VehicleModelYear WHERE year = :year AND make = :make';
        sequelize.query(modelQuery,
            {
                replacements: { year: req.params.year, make: req.params.make},
                type: sequelize.QueryTypes.SELECT
            }
        ).then(function (response) {
            res.json(response);
        }).catch(function (error) {
            console.log("AN ERROR OCCURED WHILE FETCHING MODELS FOR YEAR");
            console.log(error);
            res.json({ error: error });
        });
    });
}