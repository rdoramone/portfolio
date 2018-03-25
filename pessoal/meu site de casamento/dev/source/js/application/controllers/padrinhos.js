/* Padrinhos */
mySite.controller('PadrinhosCtrl', ['$rootScope', '$scope', function($rootScope, $scope){
	$rootScope.contentHead = {
    	title       : 'Padrinhos',
    	description : 'Padrinhos do Ricardo e Tauana que foram escolhidos com muito carinho e amor.',
    	keywords    : 'padrinhos tau e ric, padrinhos ric e tau, padrinhos ricardo e tauana, padrinhos tauana e ricardo, padrinhos ricardo, padrinhos tauana, padrinhos tau padrinhos ric, padrinhos do ricardo, padrinhos da tauana, padrinhos da tau, padrinhos do ric'
    };

    $rootScope.showPlayer = false;
    $rootScope.showOverlay = false;
    $scope.imageSelected = false;
}]);