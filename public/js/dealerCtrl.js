
app.controller("DealerCtrl", function($scope, dealerService, $http) {
    // Call the dealerService to fetch the data for the dealers
    dealerService.query(function(data) {
        // Store the data from the dealers in scope for later use
        $scope.dealers = data;
    }, function(err) {
        console.error("Error occured: ", err);
    })

  
    // Grab data from row that was clicked on in dealer table
    // Toggle visibility of divs
    $scope.processData = function(data) {
        $scope.id = data.id;
        $scope.name=data.name;
        $scope.address=data.address;
        $scope.phone=data.phone;
        $scope.phoneExt=data.phone_ext;
        $scope.city=data.city;
        $scope.state=data.state;
        $scope.zip=data.zip;
        $('.dealerTableDiv').hide();
        $('.btnAddDealer').hide();
        $('.btnSaveDealer').hide();
        $('.dealerInputDiv').show();
        $('.btnUpdateDealer').show();
    }
})

