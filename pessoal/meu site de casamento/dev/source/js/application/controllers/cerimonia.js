/* Cerimônia de casamento */
mySite.controller('CerimoniaCtrl', ['$rootScope', '$scope', function($rootScope, $scope){
	$rootScope.contentHead = {
    	title       : 'A Cerimônia',
    	description : 'A Cerimônia, um momento mais que especiais para ambos, onde iremos nós unir para sempre.',
    	keywords    : 'a cerimonia, a cerimonia ric e tau, a cerimonia tau e ric, a cerimonia ricardo e tauana, a cerimonia tauana e ricardo, cerimonia, cerimonia ric e tau, cerimonia tau e ric, cerimonia ricardo e tauana, cerimonia tauana e ricardo'
    };

    $rootScope.showPlayer = false;
    $rootScope.showOverlay = false;
}]);