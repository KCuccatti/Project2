app.factory("dealerService", function($resource) {
    return $resource("/api/GetDealers/");
})


