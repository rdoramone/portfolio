/* Recados */
mySite.controller('RecadosCtrl', ['$rootScope', '$scope', '$http', '$interval', function($rootScope, $scope, $http, $interval){
    $rootScope.contentHead = {
        title       : 'Recados',
        description : 'Deixe aqui um recadinho para os noivos!!!',
        keywords    : 'recados, recado, recados tauana e ricardo, recados ricardo e tauana, tauana e ricardo, recado tauana e ricardo, recado ricardo e tauan, recados ricardo, recados tauana, recado tauana, recado ricardo, recados tau, recados ric, recado tau, recado ric'
    };

    $rootScope.showPlayer = false;
    $rootScope.showOverlay = false;
    $scope.formData = {}
    $scope.statusCode = 0;
    $scope.showModal = false;
    $scope.success = false;
    $scope.erro = false;
    $scope.msgSuccess = 'Sua mensagem foi enviada com sucesso.';
    $scope.msgErro = 'Sua mensagem não pode ser enviada.';

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
          email   : '',
          message : ''
        }
        $scope.formData = angular.copy(form);
        $scope.messageForm.$setPristine();
    }

    $scope.getMessages = function(){
        $http.get('/getMessage').success(function(data){
            var newData = new Array(),
                newDate;

            for(var i in data){
                var dateDb = new Date(data[i].date),
                    day = '0' + dateDb.getDate(),
                    mon = '0' + dateDb.getMonth(),
                    hor = '0' + dateDb.getHours(),
                    min = '0' + dateDb.getMinutes(),
                    sec = '0' + dateDb.getSeconds();
                
                newDate = (dateDb.getDate() < 9 ? day : dateDb.getDate()) + '/' + (dateDb.getMonth() < 9 ? mon : dateDb.getMonth()) + '/' + dateDb.getFullYear() + ' às ' + (dateDb.getHours() < 9 ? hor : dateDb.getHours()) + ':' + (dateDb.getMinutes() < 9 ? min : dateDb.getMinutes()) + ':' + (dateDb.getSeconds() < 9 ? sec : dateDb.getSeconds());

                newData[i] = {
                    name: data[i].name,
                    email: data[i].email,
                    message: data[i].message,
                    date: newDate
                }
            }

            $scope.messages = newData;
        }).error(function(data, status){
           
        });
    };

    $scope.close = function(){
        $scope.showModal = false;
        $scope.getMessages();
        resetForm();
        document.body.scrollTop = document.body.scrollHeight;
    };

    $scope.sendPost = function(isValid){
      $scope.showModal = true;

      if(isValid){
        $http.post('/postMessage', $scope.formData).then(function successCallback(response){
            $scope.success = true;
        }, function errorCallback(response){
            $scope.erro = true;
        });
      }

      positionModal();
    };
    /*$scope.sendPost = function(){
        var promise;
        
        $http.post('/postMessage', $scope.formData).success(function(data, status){
           alert(data); 
           alert(status); 

           promise = answerMessage(status);
           promise.then(function(message){
               console.log('Sucesso. ' + message);
               alert('Sucesso. ' + message);
           }, function(reason){
               console.log('Erro. ' + reason);
               alert('Erro. ' + reason);
           });

        }).error(function(data, status){
           alert(data); 
           alert(status); 

           promise = answerMessage(status);
           promise.then(function(message){
               console.log('Sucesso. ' + message);
               alert('Sucesso. ' + message);
           }, function(reason){
               console.log('Erro. ' + reason);
               alert('Erro. ' + reason);
           });

        });

        function answerMessage(statusCode){
            return $q(function(resolve, reject){
                $timeout(function(){
                    if(statusCode == 200){
                        resolve('Status ' + statusCode + ' está correto. Pode prosseguir.');
                    }
                    else{
                        reject('Status ' + statusCode + ' está errado. Pare por aqui.');
                    }
                }, 1000);
            });
        }
    };*/

    $scope.getMessages();
}]);