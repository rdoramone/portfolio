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