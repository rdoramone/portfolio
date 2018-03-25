/* Home */
mySite.controller('HomeCtrl', ['$rootScope', '$scope', '$interval', function($rootScope, $scope, $interval){
    $rootScope.contentHead = {
    	title       : 'Home',
    	description : 'Site de Casamento do Casal Tauana e Ricardo, aqui colocamos todas as informações sobre os eventos e sobre o casamento.',
    	keywords    : 'Ricardo e Tauana, Tauana e Ricardo, Ric e Tau, Tau e Ric, Rick e Tau, Tau e Rick, Casamento Tauana e Ricardo, Casamento Ricardo e Tauana'
    };

    function countdown(){
		var currentDate = Date.parse(new Date()),
			saveTheDate = Date.parse('July 23, 2016 20:00:00 GMT-0300'),
			time = saveTheDate - currentDate,
			seconds = Math.floor((time / 1000) % 60),
			minutes = Math.floor((time / 1000 / 60) % 60),
			hours = Math.floor((time / (1000 * 60 * 60)) % 24),
			days = Math.floor(time / (1000 * 60 * 60 *24)),
			timeW = currentDate - saveTheDate,
			secondsW = Math.floor((timeW / 1000) % 60),
			minutesW = Math.floor((timeW / 1000 / 60) % 60),
			hoursW = Math.floor((timeW / (1000 * 60 * 60)) % 24),
			daysW = Math.floor(timeW / (1000 * 60 * 60 *24));

	    $scope.textDays = days > 1 || daysW > 1 ? 'Dias' : 'Dia';
	    $scope.textHours = hours > 1 || hoursW > 1 ? 'Horas' : 'Hora';
	    $scope.textMinutes = minutes > 1 || minutesW > 1 ? 'Minutos' : 'Minuto';
		$scope.textSeconds = seconds > 1 || secondsW > 1 ? 'Segundos' : 'Segundo';
		$scope.textIntro = time >= 0 ? 'Faltam' : 'Casados há';

		if(time >= 0){
			angular.element(document.querySelector('.countdown-days p')).find('strong').text(days);
			angular.element(document.querySelector('.countdown-hours p')).find('strong').text(hours);
			angular.element(document.querySelector('.countdown-minutes p')).find('strong').text(minutes);
			angular.element(document.querySelector('.countdown-seconds p')).find('strong').text(seconds);
		}
		else{
			angular.element(document.querySelector('.countdown-days p')).find('strong').text(daysW);
			angular.element(document.querySelector('.countdown-hours p')).find('strong').text(hoursW);
			angular.element(document.querySelector('.countdown-minutes p')).find('strong').text(minutesW);
			angular.element(document.querySelector('.countdown-seconds p')).find('strong').text(secondsW);	
		}
    }

    countdown();

	$interval(function(){
		countdown();
	}, 1000);
}]);