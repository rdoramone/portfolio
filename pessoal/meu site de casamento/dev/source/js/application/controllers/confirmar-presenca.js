/* Confirmar Presença */
mySite.controller('ConfirmarPresencaCtrl', ['$rootScope', '$scope', '$http', '$interval', function($rootScope, $scope, $http, $interval){
	$rootScope.contentHead = {
    	title       : 'RSVP',
    	description : 'Confirme a sua presença, pois é muito importante para nós a sua presença.',
    	keywords    : 'rsvp, lista de convidados, lista de presença, lista de confirmação, lista, lista tau e ric, lista ric e tau, lista de convidados ricardo e tauana, lista de convidados tauana e ricardo, lista de convidados ric e tau lista de convidados tau e ric'
    };

    $rootScope.showPlayer = false;
    $rootScope.showOverlay = false;
    $scope.formData = {};
    $scope.showModal = false;
    $scope.success = false;
    $scope.erro = false;
    $scope.msgSuccess = 'Sua presença está confirmada.';
    $scope.msgErro = 'Se deu mal, vai perder um festão.';
    $scope.countCompanions = 0;
    $scope.arrCompanions = [];
    $scope.newCompanions = [];

    // Posiciona o Modal
    function positionModal(){
        angular.element(document.querySelector('.modal')).removeAttr('style');

        var body = document.body,
            modal = document.querySelector('.modal'),
            setWidthModal = window.innerWidth < 768 ? 0.8 : 0.5,
            widthModal = parseFloat(body.clientWidth * setWidthModal),
            newWidthModal =  widthModal > 500 ? 500 : widthModal < 300 ? 300 : widthModal,
            currentWidthModal;

        modal.style.width = newWidthModal + 'px';
        currentWidthModal = parseFloat(modal.style.width.replace('px', ''));
        modal.style.left = ((body.clientWidth - currentWidthModal) / 2) + 'px';

        var centralizeModal = $interval(function(){
            var newTopModal = body.scrollTop + ((window.innerHeight - modal.clientHeight) / 2) + 'px';
            modal.style.top = newTopModal;
            
            console.log('rodando');
            if(modal.style.top == newTopModal){
                $interval.cancel(centralizeModal);
                console.log('parou');
            }
        }, 100);
    }

    // Reset de Form
    function resetForm(){
      var form = {
          name    : '',
          email   : ''
        }
        $scope.formData = angular.copy(form);
        $scope.presenceForm.$setPristine();
        $scope.showModal = false;
    }

    $scope.close = function(){
        resetForm();
        angular.element(document.querySelector('.modal')).removeAttr('styel');
    };

    $scope.addCompanions = function(){
        $scope.countCompanions++;
        $scope.arrCompanions.push($scope.countCompanions);
    };

    $scope.removeCompanions = function($index){
        $scope.countCompanions--;  
        $scope.arrCompanions.splice($index, 1);
        delete $scope.formData.companions[$index + 1]
    };

    $scope.sendPost = function(isValid){
        $scope.showModal = true;

        for(var i in $scope.formData.companions){
            console.log($scope.formData.companions[i]);
            $scope.newCompanions.push($scope.formData.companions[i]);
        }

        $scope.formData.companions = $scope.newCompanions;

        if(isValid){
            $http.post('/postPresence', $scope.formData).then(function successCallback(response){

            }, function errorCallback(response){
                
            });
        }

        positionModal();
    };
}]);