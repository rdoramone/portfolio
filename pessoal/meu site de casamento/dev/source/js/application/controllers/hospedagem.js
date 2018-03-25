/* Hospedagem */
mySite.controller('HospedagemCtrl', ['$rootScope', '$scope', function($rootScope, $scope){
	$rootScope.contentHead = {
    	title       : 'Hospedagem',
    	description : '',
    	keywords    : 'hospedagem'
    };

    $rootScope.showPlayer = false;
    $rootScope.showOverlay = false;
}]);