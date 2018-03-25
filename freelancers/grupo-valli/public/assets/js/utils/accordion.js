var Accordion = (function(){

	function Accordion(){
		function slideUpSiblings(){
			$('.btn-accordion').removeClass('active').next().removeClass('active').slideUp(400, function(){
				$('.btn-accordion').find('i').removeClass('arrow-up').addClass('arrow-down');
			});
		}

		$('.btn-accordion').on('click', function(){
			if(!$(this).hasClass('active')){
				slideUpSiblings();

				$(this).addClass('active').next().addClass('active').slideDown(400, function(){
					$(this).prev().find('i').removeClass('arrow-down').addClass('arrow-up');
				});
			}
			else{
				slideUpSiblings();
			}
		});

		var href = window.location.href,
			path = '',
			idBusiness = '';

		if(window.location.hostname == 'localhost'){
			path = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + window.location.pathname;
		}
		else{
			path = window.location.protocol + '//' + window.location.hostname + window.location.pathname;
		}

		idBusiness = href.replace(path, '');

		if($(idBusiness)){
			$(window).on('load', function(){
				$(idBusiness).addClass('active').next().addClass('active').slideDown(400, function(){
					$(this).prev().find('i').removeClass('arrow-down').addClass('arrow-up');
				});
			});
		}	
	}

	return Accordion;
}());