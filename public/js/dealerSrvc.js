app.factory("dealerService", function($resource) {
    return $resource("http://localhost:8080/api/GetDealers/");
})


