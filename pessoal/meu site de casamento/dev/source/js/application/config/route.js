/* ROUTES */
mySite.config(['$httpProvider', '$routeProvider', '$locationProvider', function($httpProvider, $routeProvider, $locationProvider){
 
    $routeProvider
    .when('/', {
        controller: 'HomeCtrl',
        templateUrl: './assets/views/home.html'
    })
    .when('/nossa-historia', {
        controller: 'NossaHistoriaCtrl',
        templateUrl: './assets/views/nossa-historia.html'
    })
    .when('/casal', {
        controller: 'CasalCtrl',
        templateUrl: './assets/views/casal.html'
    })
    .when('/daminhas', {
        controller: 'DaminhasCtrl',
        templateUrl: './assets/views/daminhas.html'
    })
    .when('/fotos', {
        controller: 'FotosCtrl',
        templateUrl: './assets/views/fotos.html'
    })
    .when('/cha-de-cozinha-e-cha-bar', {
        controller: 'ChaCozinhaBarCtrl',
        templateUrl: './assets/views/cha-de-cozinha.html'
    })
    .when('/cerimonia-de-casamento', {
        controller: 'CerimoniaCtrl',
        templateUrl: './assets/views/cerimonia.html'
    })
    .when('/lista-de-presentes', {
        controller: 'ListaPresentesCtrl',
        templateUrl: './assets/views/lista-de-presentes.html'
    })
    .when('/confirmar-presenca', {
        controller: 'ConfirmarPresencaCtrl',
        templateUrl: './assets/views/confirmar-presenca.html'
    })
    .when('/padrinhos', {
        controller: 'PadrinhosCtrl',
        templateUrl: './assets/views/padrinhos.html'
    })
    .when('/hospedagem', {
        controller: 'HospedagemCtrl',
        templateUrl: './assets/views/hospedagem.html'
    })
    .when('/recados', {
        controller: 'RecadosCtrl',
        templateUrl: './assets/views/recados.html'
    })
    .otherwise({
        redirectTo: '/'
    });

    // $locationProvider.hashPrefix('!');
 
    $locationProvider.html5Mode({
        'enabled': true,
        'requireBase' : false
    }).hashPrefix('!');
}]);