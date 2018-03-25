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