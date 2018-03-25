/* Daminhas */
mySite.controller('DaminhasCtrl', ['$rootScope', '$scope', function($rootScope, $scope){
	$rootScope.contentHead = {
    	title       : 'Daminhas',
    	description : 'As Daminhas mais que especiais para nós só podia ser elas Pandora, Laura e Julia',
    	keywords    : 'daminhas, daminha julia, daminha laura, daminha pandora, pandora, laura, julia, daminhas ric e tau, daminhas tau e ric, daminhas do casamento do ricardo e tauana, daminhas do casamento da tauana e ricardo, daminhas tauana e ricardo'
    };

    $rootScope.showPlayer = false;
    $rootScope.showOverlay = false;
    $scope.imageSelected = false;
}]);