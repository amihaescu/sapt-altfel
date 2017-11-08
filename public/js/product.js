var myApp = angular.module('productExample',[]);

myApp.controller('ProductController', function($scope, $http){
    $scope.newProduct = {};
    $scope.products = [];
    $scope.titleError = false;
    $scope.numberError = false;
    $scope.success = false;

    $scope.addProduct = function(){
        $scope.newProduct.votes = 0;
        if (validate()){
            $http({
                method : 'POST',
                url : '/product',
                data: $scope.newProduct
            }).then(function successCallback(response) {
                $scope.getProducts();
                $scope.success = true;
                $scope.newProduct = {};
            }, function errorCallback(response){

            });
        }
    };

    function validate(){
        return validateTitle() && validateNumber();
    }

    function validateTitle(){
        $scope.titleError = $scope.newProduct.name === undefined || $scope.newProduct.name === "";
        return !$scope.titleError;
    };


    function validateNumber(){
        $scope.numberError =    isNaN($scope.newProduct.price);
        return !$scope.numberError;
    };

    $scope.vote = function(product){
        $http({
            method: 'PATCH',
            url : '/product/'+product.id,
            data : {'votes': product.votes + 1}
        }).then(function successCallback(response){
            $scope.getProducts();
        }, function errorCallback(response){

        });
    };

    $scope.getProducts = function(){
        $http({
            method: 'GET',
            url: '/product'
        }).then(function successCallback(response) {
            $scope.products = response.data;
        }, function errorCallback(response) {

        });
    };

    //setInterval(function(){$scope.getProducts();}, 1000);
    $scope.getProducts();


});