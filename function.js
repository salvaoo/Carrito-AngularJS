var App = angular.module('App', ['ModuloTienda']);


var moduloTienda = angular.module('ModuloTienda', []);

moduloTienda.factory('Products', function () {
    var products = {};
    var datos = [{
            name: 'Carne Mecha',
            price: '23',
            qty: 0
        },
        {
            name: 'Jamón Pata Negra',
            price: '54',
            qty: 0
        },
        {
            name: 'Solomillo Iberico',
            price: '72',
            qty: 0
        },
        {
            name: 'Mortadela de Pavo',
            price: '17',
            qty: 0
        }
    ];
    products.get = function () {
        return datos;
    }

    products.add = function (nombre, precio, cantidad) {
        var valores = {
            name: nombre,
            price: precio,
            qty: cantidad
        };
        datos.push(valores);
    }

    return products;
});


App.controller('ControlCarrito', function (Products, $scope) {
    $scope.bill = {};
    $scope.products = Products.get();

    $scope.totalCart = function () {
        var total = 0;
        for (var i = 0, len = $scope.products.length; i < len; i++) {
            total = total + $scope.products[i].price * $scope.products[i].qty;
        }

        return total;
    }

    $scope.subtotal = function () {
        return $scope.totalCart() - $scope.bill.discount;
    }

    function calculateDiscount(newValue, oldValue, scope) {
        $scope.bill.discount = newValue > 100 ? 10 : 0;
    }

    $scope.$watch($scope.totalCart, calculateDiscount);

    $scope.remove = function (index) {
        $scope.products.splice(index, 1);
    }

    $scope.add = function (nombreN, precioN, cantidadN) {
        Products.add(nombreN, precioN, cantidadN);
    }
});