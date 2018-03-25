/* Chá de cozinha e chá bar */
mySite.controller('ChaCozinhaBarCtrl', ['$rootScope', '$scope', function($rootScope, $scope){
	$rootScope.contentHead = {
    	title       : 'Chá de Cozinha',
    	description : 'Chá de cozinha e chá bar, foi uma bagunça bem gostosa, se a gente pudesse, repetiriamos tudo de novo.',
    	keywords    : 'chá de cozinha ric e tau, chá de cozinha ricardo e tauana, chá de cozinha tau e ric, chá de cozinha tauana e ricardo, chá bar ric e tau, chá bar tau e ric, chá bar ricardo e tauana, chá bar tauana e ricardo'
    };

    $rootScope.showPlayer = false;
    $rootScope.showOverlay = false;
}]);