(function() {

    var app = angular.module("carpool");

    app.factory("AccountService", ["$q", "$rootScope", "$http", function($q, $rootScope, $http) {
        return {
            resolve: function() {
                return $http.get("/api/my/account").then(function(response) {
                    $rootScope.setAccount(response.data);
                }, function(errorResponse) {
                    $rootScope.setAccount(null);
                    console.error("Failed to load account: " + errorResponse);
                    return null; // do not block downstream
                });
            },
            update: function (account) {
                return $http.post("/api/my/account", account).then(function(response) {
                    return response.data;
                }, function (errorResponse) {
                    return $q.reject({status: "error"});
                });
            }
        };
    }]);

}());
