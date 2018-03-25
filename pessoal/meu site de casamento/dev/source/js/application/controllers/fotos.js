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