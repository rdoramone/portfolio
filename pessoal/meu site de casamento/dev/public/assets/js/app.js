var mySite = angular.module('mySite', ['ngRoute', 'ngResource']);
/* INITIALIZER */
mySite.run(['$rootScope', '$interval', function($rootScope, $interval){  
    var player = document.getElementById('player'),
        srcPlayer = document.getElementById('src-music'),
        btPlay = document.getElementById('play'),
        btPause =  document.getElementById('pause'),
        pathMusic = 'assets/musics/',
        musics = ['banda_eva-eva', 'mana_feat_jorge_e_matheus-voce_e_minha_religiao',  'forrueiros-como_todo_amor', 'jason_mraz-i_won_t_give_up', 'soja-you_and_me', 'timbalada-minha_historia', 'john_legend-all_of_me'],
        extMusic = '.mp3',
        countMusic = 1,
        verifyMusicPlay,
        firstMusic,
        lastMusic;

    $rootScope.showPlayer = true;
    $rootScope.showOverlay = true;

    /* START Menu */
    $rootScope.showMenu = function(){
        angular.element(document.querySelector('#box-btn-menu')).toggleClass('active');
        angular.element(document.querySelector('#header')).toggleClass('active');
        angular.element(document.querySelector('.overlay')).toggleClass('active');
    };

    $rootScope.hideMenu = function(){
        angular.element(document.querySelector('#box-btn-menu')).removeClass('active');
        angular.element(document.querySelector('#header')).removeClass('active');
        angular.element(document.querySelector('.overlay')).removeClass('active');
        angular.element(document.querySelectorAll('.dropdown')).children().removeClass('active').next().removeClass('active');
    };

    $rootScope.dropdown = function($event){
        if(angular.element($event.target).hasClass('active')){
            angular.element($event.target).toggleClass('active').next().toggleClass('active');
        }
        else{
            angular.element(document.querySelectorAll('.dropdown')).children().removeClass('active').next().removeClass('active');
            angular.element($event.target).toggleClass('active').next().toggleClass('active');
        }
    };
    /* END Menu */

    /* START Volume incial do Player */
    player.volume = 0.5;
    /* END Volume incial do Player */

    /* START Controles do player */
    function loadMusic(){
        srcPlayer.src = pathMusic + musics[countMusic] + extMusic;
        player.load();

        if(musics[countMusic] == 'mana_feat_jorge_e_matheus-voce_e_minha_religiao'){
            player.currentTime = 14;
        }
    };

    function changeMusicBackward(){
        lastMusic = musics.pop();
        musics.unshift(lastMusic);
        loadMusic();  
    };

    function changeMusicForward(){
        firstMusic = musics.shift();
        musics.push(firstMusic);
        loadMusic();
    };

    $rootScope.backward = function(){
        if(player.readyState == 4){
            changeMusicBackward();
            player.play(); 
        }
        else{
            changeMusicBackward(); 
        }
    }

    $rootScope.play = function(){
        srcPlayer.src = pathMusic + musics[countMusic] + extMusic;

        if(player.readyState == 0){
            player.load();

            if(musics[countMusic] == 'mana_feat_jorge_e_matheus-voce_e_minha_religiao'){
                player.currentTime = 14;
            }
        }

        player.play();
        btPlay.style.display = 'none';
        btPause.style.display = 'block';
    }

    $rootScope.pause = function(){
        player.pause();
        btPlay.style.display = 'block';
        btPause.style.display = 'none';
    }

    $rootScope.forward = function(){
        if(player.readyState == 4){
            changeMusicForward();
            player.play(); 
        }
        else{
            changeMusicForward();
        }
    }
    /* END Controles do player */

    $rootScope.ModalPause = function(){
        player.pause();
        $rootScope.showPlayer = false;
        $rootScope.showOverlay = false;
        btPlay.style.display = 'block';
        btPause.style.display = 'none';
    };

    $rootScope.ModalPlay = function(){
        loadMusic();
        player.play();
        $rootScope.showPlayer = false;
        $rootScope.showOverlay = false;
        btPlay.style.display = 'none';
        btPause.style.display = 'block';
    };
    /* END Modal */

    /* START Verifica se a música terminou para poder trocar */
    verifyMusicPlay = $interval(function(){
        if(player.ended){
            $rootScope.forward();
        }
    }, 1000);
    /* END Verifica se a música terminou para poder trocar */
}]);
/* ROUTES */
mySite.config(['$httpProvider', '$routeProvider', '$locationProvider', function($httpProvider, $routeProvider, $locationProvider){
 
    $routeProvider
    .when('/', {
        controller: 'HomeCtrl',
        templateUrl: './assets/views/home.html'
    })
    .when('/nossa-historia', {
        controller: 'NossaHistoriaCtrl',
        templateUrl: './assets/views/nossa-historia.html'
    })
    .when('/casal', {
        controller: 'CasalCtrl',
        templateUrl: './assets/views/casal.html'
    })
    .when('/daminhas', {
        controller: 'DaminhasCtrl',
        templateUrl: './assets/views/daminhas.html'
    })
    .when('/fotos', {
        controller: 'FotosCtrl',
        templateUrl: './assets/views/fotos.html'
    })
    .when('/cha-de-cozinha-e-cha-bar', {
        controller: 'ChaCozinhaBarCtrl',
        templateUrl: './assets/views/cha-de-cozinha.html'
    })
    .when('/cerimonia-de-casamento', {
        controller: 'CerimoniaCtrl',
        templateUrl: './assets/views/cerimonia.html'
    })
    .when('/lista-de-presentes', {
        controller: 'ListaPresentesCtrl',
        templateUrl: './assets/views/lista-de-presentes.html'
    })
    .when('/confirmar-presenca', {
        controller: 'ConfirmarPresencaCtrl',
        templateUrl: './assets/views/confirmar-presenca.html'
    })
    .when('/padrinhos', {
        controller: 'PadrinhosCtrl',
        templateUrl: './assets/views/padrinhos.html'
    })
    .when('/hospedagem', {
        controller: 'HospedagemCtrl',
        templateUrl: './assets/views/hospedagem.html'
    })
    .when('/recados', {
        controller: 'RecadosCtrl',
        templateUrl: './assets/views/recados.html'
    })
    .otherwise({
        redirectTo: '/'
    });

    // $locationProvider.hashPrefix('!');
 
    $locationProvider.html5Mode({
        'enabled': true,
        'requireBase' : false
    }).hashPrefix('!');
}]);
/* O casal */
mySite.controller('CasalCtrl', ['$rootScope', '$scope', function($rootScope, $scope){
	$rootScope.contentHead = {
    	title       : 'O casal',
    	description : '',
    	keywords    : 'o casal tau e ric, o casal ric e tau, o casal tauana e ricardo, o casal ricardo e tauana, casal tau e ric, casal ric e tau, casal tauana e ricardo, casal ricardo e tauana'
    };

    $rootScope.showPlayer = false;
    $rootScope.showOverlay = false;
}]);
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
/* As Fotos */
mySite.controller('FotosCtrl', ['$rootScope', '$scope', '$interval', function($rootScope, $scope, $interval){
	$rootScope.contentHead = {
    	title       : 'Fotos',
    	description : 'Fotos do casal Tauana e Ricardo no decorrer desses 10 anos de namoro e noivado',
    	keywords    : 'fotos tauana e ricardo, fotos ricardo e tauana, fotos do casal, fotos ric e tau, fotos tau e ric, fotos do casamento ric e tau, fotos do casamento tau e ric, fotos do casamento tauana e ricardo'
    };

    $rootScope.showPlayer = false;
    $rootScope.showOverlay = false;
    $rootScope.hasText = false;
    $scope.imageSelected = false;
    $scope.idx = false;

    function positionModal(){
        var body = document.body,
            modal = document.querySelector('#carousel'),
            prev = document.getElementById('prev'),
            next = document.getElementById('next');

        modal.style.width = 'auto';

        var centralizeModal = $interval(function(){
        	modal.style.left = ((body.clientWidth - modal.clientWidth) / 2) + 'px';
        	prev.style.top = ((modal.clientHeight - prev.clientHeight) / 2) + 'px';
        	next.style.top = ((modal.clientHeight - next.clientHeight) / 2) + 'px';

            var newTopModal = body.scrollTop + ((window.innerHeight - modal.clientHeight) / 2) + 'px';
            modal.style.top = newTopModal;
            
            if(modal.style.top == newTopModal){
                $interval.cancel(centralizeModal);
            }
        }, 100);
    }

    $scope.carouselDefault = function($event){
        $rootScope.showOverlay = true;
        $scope.imageSelected = true;

        var target = $event.target,
        	imageBig = target.src.replace('thumbs/',''),
        	altImage = target.alt,
        	dataIdx = target.getAttribute('data-index'),
        	galleryLength = angular.element(document.querySelector('.gallery')).find('a').length;

        if(dataIdx <= 1){
        	$scope.firstImage = false;
        }
        else{
        	$scope.firstImage = true;
        }

        if(dataIdx == galleryLength){
        	$scope.lastImage = false;
        }
        else{
        	$scope.lastImage = true;
        }
        
        angular.element(document.getElementById('current-image')).find('img').attr('src', imageBig);
        angular.element(document.getElementById('current-image')).find('img').attr('alt', altImage);
        angular.element(document.getElementById('current-image')).find('img').attr('data-index', dataIdx);

        positionModal();
    }

    $scope.close = function(){
    	$rootScope.showOverlay = false;
    	$scope.imageSelected = false;
    	angular.element(document.getElementById('current-image')).find('img').removeAttr('src');
    	angular.element(document.getElementById('current-image')).find('img').removeAttr('alt');
    	angular.element(document.querySelector('#carousel')).removeAttr('style');
        angular.element(document.querySelector('#prev')).removeAttr('style');
        angular.element(document.querySelector('#next')).removeAttr('style');
    };

    $scope.prev = function(){
    	var idxCurrentImage = angular.element(document.getElementById('current-image')).find('img').attr('data-index') - 2;
    		srcImage = angular.element(document.querySelector('.gallery')).find('a').eq(idxCurrentImage).find('img').attr('src').replace('thumbs/', ''),
    		altImage = angular.element(document.querySelector('.gallery')).find('a').eq(idxCurrentImage).find('img').attr('alt'),
    		dataIdx = angular.element(document.querySelector('.gallery')).find('a').eq(idxCurrentImage).find('img').attr('data-index'),
    		galleryLength = angular.element(document.querySelector('.gallery')).find('a').length;

    	angular.element(document.getElementById('current-image')).find('img').attr('src', srcImage);
        angular.element(document.getElementById('current-image')).find('img').attr('alt', altImage);
        angular.element(document.getElementById('current-image')).find('img').attr('data-index', dataIdx);

        if(idxCurrentImage < 1){
        	$scope.firstImage = false;
        }

        if(idxCurrentImage < galleryLength){
        	$scope.lastImage = true;
        }

        positionModal();
    };

    $scope.next = function(){
    	var idxCurrentImage = parseInt(angular.element(document.getElementById('current-image')).find('img').attr('data-index'));
    		srcImage = angular.element(document.querySelector('.gallery')).find('a').eq(idxCurrentImage).find('img').attr('src').replace('thumbs/', ''),
    		altImage = angular.element(document.querySelector('.gallery')).find('a').eq(idxCurrentImage).find('img').attr('alt'),
    		dataIdx = angular.element(document.querySelector('.gallery')).find('a').eq(idxCurrentImage).find('img').attr('data-index'),
    		galleryLength = angular.element(document.querySelector('.gallery')).find('a').length;

    	if(idxCurrentImage > 0){
        	$scope.firstImage = true;
        }

        if(idxCurrentImage == (galleryLength - 1)){
        	$scope.lastImage = false;
        }

    	angular.element(document.getElementById('current-image')).find('img').attr('src', srcImage);
        angular.element(document.getElementById('current-image')).find('img').attr('alt', altImage);
        angular.element(document.getElementById('current-image')).find('img').attr('data-index', dataIdx);

        positionModal();
    };
}]);
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
mySite.directive('btmenu', function(){
	return {
		templateUrl : './assets/views/btmenu.html'
	}
});
mySite.directive('carousel', function(){
	return {
		templateUrl : './assets/views/carousel.html'
	}
});
mySite.directive('footer', function(){
	return {
		templateUrl: './assets/views/footer.html'
	}
});
mySite.directive('map', function(){
	
    var map,
    	mapOptions,
    	marker,
    	eoCasco,
    	infowindow,
    	contentString,
    	latUser,
    	lonUser,
    	currentPosition,
		initMap = function(){
	    /* Conteúdo do infoWindow */
	    /*contentString = '<div id="info-window"> \
	    	<h1>Buffet É o Casco</h1> \
	    	<p class="address">Rua Miguel Prisco, 1100, Ribeirão Pires - São Paulo</p> \
	    	<a href="javascript:void(0)" class="how-to-get" title="Como chegar">Como chegar</a> \
	    </div>';*/

	    contentString = '<div id="info-window"> \
	    	<h1>Buffet É o Casco</h1> \
	    	<p class="address">Rua Miguel Prisco, 1100, Ribeirão Pires - São Paulo</p> \
	    </div>';

	    /* Pega a localização do usuário */
	    /*function getLocation(){
	    	if(navigator.geolocation){
	    		navigator.geolocation.getCurrentPosition(showPosition);
	    	}
	    	else{
	    		console.log('Não tem suporte para Geolocalização');
	    	}
	    }*/

	    /* Defini a latitude e longitude atual do usuário de acordo com o GPS */
		/*function showPosition(position){
			latUser = position.coords.latitude;
			lonUser = position.coords.longitude;

	    	 Latitude e Longitude do usuário 
			currentPosition = {lat: latUser, lng: lonUser};
			console.log(currentPosition.lat);
			console.log(currentPosition.lng);
		}*/

	    /* Latitude e Longitude do É o Casco */
	    eoCasco = new google.maps.LatLng(-23.702226, -46.410706);
		
		/* Opções do mapa */
		mapOptions = {
			center: eoCasco,
			zoom: 16,
			mapTypeControl: true,
			streetViewControl: true,
			zoomControl: true
		};

		/* Define o mapa */
	  	map = new google.maps.Map(document.getElementById('map'), mapOptions);

	  	/* Define o infoWindow */
	  	infowindow = new google.maps.InfoWindow({
	  		content: contentString
	  	});

	  	/* Define o marcador */
		marker = new google.maps.Marker({
			// animation: google.maps.Animation.BOUNCE,
			position: eoCasco,
			map: map,
			title: "Buffet É o Casco"
			// icon: Para adicionar uma imagem personalizada no marcador
		});

		/* Ao clicar no marcador o marcador para de animar e abre o info window */
		marker.addListener('click', function(){
			toggleBounce();
			infowindow.open(map, marker);
			/*document.querySelector('.how-to-get').onclick = function(){
				getLocation();
			}*/
		});

		/* Chama a função toggleBounce ao fechar o infoWindow */
		infowindow.addListener('closeclick', toggleBounce);

		/* Verificar se existe a animação do Marcador para animar ou cancelar a animação */
		function toggleBounce(){
			if(marker.getAnimation() !== null || document.querySelector('#info-window') !== null){
				marker.setAnimation(null);
			}
			else{
				marker.setAnimation(google.maps.Animation.BOUNCE);
			}
		};
	};

	return {
		link: initMap
	};
});
mySite.directive('menu', function(){
	return {
		templateUrl : './assets/views/menu.html'
	}
});
mySite.directive('social', function(){
	return {
		templateUrl : './assets/views/social.html'
	}
});