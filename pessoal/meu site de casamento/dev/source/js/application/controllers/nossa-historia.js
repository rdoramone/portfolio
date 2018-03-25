/* Nossa Historia */
mySite.controller('NossaHistoriaCtrl', ['$rootScope', function($rootScope){
	$rootScope.contentHead = {
    	title       : 'Nossa História',
    	description : 'Tudo começou no fim do ano de 2005, quando nos vimos pela primeira vez na faculdade. Eu o garoto do fone(segundo a Tauana) e ela a pequena que vivia correndo todas as sexta-feiras para poder ir para balada em Ribeirão.....danada',
    	keywords    : 'história do ricardo e tauana, história da tauana e ricardo, historia do casal ricardo e tauana, historia do casal tauana e ricardo, tauana e ricardo, nossa história ricardo e tauana'
    };

    $rootScope.showPlayer = false;
    $rootScope.showOverlay = false;
}]);