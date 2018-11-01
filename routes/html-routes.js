const path = require('path');

module.exports = function(app) {


    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    

     // Catch all route if nothing is entered in url, go to home page
     app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });











}