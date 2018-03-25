/* Lista de presentes */
mySite.controller('ListaPresentesCtrl', ['$rootScope', '$scope', '$http', '$interval', function($rootScope, $scope, $http, $interval){
    $rootScope.contentHead = {
        title       : 'Lista de Presentes',
        description : 'Lista de Presentes do casamento da Tauana e Ricardo afinal precisamos de um forcinha nessa nova etapa das nossas vidas',
        keywords    : 'lista de presente ric e tau, lista de presentes tau e ric, lista de presentes tauana e ricardo, lista de presentes ricardo e tauana, lista de presentes, lista de presente, lista de presente ricardo e tauana, lista de presente tauana e ricardo'
    };

    $rootScope.showPlayer = false;
    $rootScope.showOverlay = false;
    $scope.countAmount = 1;
    $scope.guestName = '';
    $scope.guestEmail = '';
    $scope.amountCurrentGift = '';
    $scope.statusCode = 0;
    $scope.showModal = false;
    $scope.boxGift = false;
    $scope.giftSelected = false;

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
        $scope.choosenGiftForm.$setPristine();
    }

    $scope.getGifts = function(){
        $http.get('/getGiftsList').success(function(data){
            $scope.gifts = data;
        }).
        error(function(data,status){
           console.log(data); 
           console.log(status); 
        });
    };

    $scope.changeTxtAmount = function(){
        if($scope.amountCurrentGift < 2){
            $scope.txtAmountCurrentGift = 'unidade disponível';
        }
        else{
            $scope.txtAmountCurrentGift = 'unidades disponíveis';
        }
    };

    $scope.chooseGift = function(id){
        $scope.showModal = true;
        $scope.boxGift = true;

        document.querySelector('body').onresize = function(){
            positionModal();
        };

        for(var i in $scope.gifts){
            if($scope.gifts[i].id == id){
                $scope.selectGift = $scope.gifts[i];
            }
        }

        $scope.amountCurrentGift = $scope.selectGift.amount - $scope.countAmount;
        $scope.changeCountAmount();
        $scope.changeTxtAmount();
        positionModal();
    };

    $scope.changeCountAmount = function(){
        if($scope.countAmount == 1){
            angular.element(document.querySelector('.btn-minus')).css("visibility", 'hidden');
        }

        if($scope.countAmount <= $scope.selectGift.amount){
            angular.element(document.querySelector('.btn-plus')).css("visibility", 'visible');
        }

        if($scope.countAmount > 1){
            angular.element(document.querySelector('.btn-minus')).css("visibility", 'visible');
        }

        if($scope.countAmount == $scope.selectGift.amount){
            angular.element(document.querySelector('.btn-plus')).css("visibility", 'hidden');
        }
    };

    $scope.close = function(){
        $scope.showModal = false;
        $scope.giftSelected = false;
        $scope.countAmount = 1
        angular.element(document.querySelector('.btn-minus')).css("visibility", 'hidden');
        $scope.getGifts();
        $scope.statusCode = 0;
        resetForm();
        angular.element(document.querySelector('.modal')).removeAttr('style');
    };

    $scope.cancel = function(){
        $scope.close();
    };

    $scope.minus = function(){
        $scope.countAmount--;
        $scope.amountCurrentGift = (parseInt($scope.selectGift.amount) - parseInt($scope.countAmount));
        $scope.changeCountAmount();
        $scope.changeTxtAmount();
    };

    $scope.plus = function(){
        $scope.countAmount++;
        $scope.amountCurrentGift = (parseInt($scope.selectGift.amount) - parseInt($scope.countAmount));
        $scope.changeCountAmount();
        $scope.changeTxtAmount();
    };

    $scope.giftSelect = function(){
        $scope.boxGift = false;
        $scope.giftSelected = true;
        positionModal();
    }

    $scope.choosenGift = function(isValid){
        positionModal();

        if(isValid){
            $scope.giftSelected = false;
            
            var data = {
                nameguest: $scope.guestname,
                emailguest: $scope.guestemail,
                giftguest: $scope.selectGift.product,
                amountgiftguest: $scope.countAmount,
                imageGift: $scope.selectGift.image,
                descriptionGift: $scope.selectGift.description,
                brandGift: $scope.selectGift.brand,
                modelGift: $scope.selectGift.model,
                colorGift: $scope.selectGift.color,
                voltageGift: $scope.selectGift.voltage,
                idgift: $scope.selectGift.id
            };

            $http.post('/postChoosenGift', data).success(function(data, status, headers, config, statusText){
                $scope.statusCode = status;
            }).
            error(function(data, status, headers, config, statusText){
                $scope.statusCode = status;
            });
        }
    };

    $scope.getGifts();
}]);