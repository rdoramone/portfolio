Index = new Class.extend(Master, {
	ITEMCLICK: null,
	BLOCO : [
		$('.bloco_1 ul.carousel-modal').clone(),
		$('.bloco_2 ul.carousel-modal').clone(),
		$('.bloco_3 ul.carousel-modal').clone(),
		$('.bloco_4 ul.carousel-modal').clone(),
		$('.bloco_5 ul.carousel-modal').clone(),
		$('.bloco_6 ul.carousel-modal').clone()
	],
	
	ready: function(){
		parent.ready();		
		such.carousel();
		such.clickCallback();
	},
	
	carousel: function(){
		$('.mycarousel').jcarousel({
			start: 1
		});
	},
	
	clickCallback: function(){		
		$('.mycarousel .jcarousel-item a').bind('click', function(e){			
			e.preventDefault();

			
			var valorClick = $(this).find('p.tit-prod').text();		
			
			
			var getRel = $(this).attr('rel');	
			var splitPos = $(this).attr('rel').split("_")[1];
			
			such.ITEMCLICK = $(this).parent().index() + 1;			
			
			if(splitPos == 6){				
				$('.container-modal').css('top', ((splitPos - 1) * 420) + 'px').fadeIn('slow');				
			} else{
				$('.container-modal').css('top', (splitPos * 360) + 'px').fadeIn('slow');
			}
			
			$('#overlay-modal').fadeIn('normal');
			$('.link-decathlon, a#close').fadeIn('slow');
			$('.' + getRel).fadeIn(1, function(){
				$('.'+getRel+' .carousel-modal').jcarousel({
					scroll: 1, 
					start: such.ITEMCLICK,
					initCallback: showModal
				});				
				
				var ulPos = $(".content-modal .jcarousel-clip-horizontal ul").css('left');
				var calcPos = ((ulPos.split('px')[0]) / 799) * -1;		
				
				$(".content-modal .jcarousel-clip-horizontal ul").find('li').eq(calcPos).addClass('active');
				
				var prodClic = $(".content-modal .jcarousel-clip-horizontal ul li.active p.nome-prod").html().split('</span>')[1].toLowerCase();
					prodClic = prodClic.replace(/[á|ã|â|à]/gi, "a");
					prodClic = prodClic.replace(/[é|ê|è]/gi, "e");
					prodClic = prodClic.replace(/[í|ì|î]/gi, "i");
					prodClic = prodClic.replace(/[õ|ò|ó|ô]/gi, "o");
					prodClic = prodClic.replace(/[ú|ù|û]/gi, "u");
					prodClic = prodClic.replace(/[ç]/gi, "c");
					prodClic = prodClic.replace(/[ñ]/gi, "n");
					prodClic = prodClic.replace(/[á|ã|â]/gi, "a");
					prodClic = prodClic.replace(/\W/gi, "-");
					prodClic = prodClic.replace(/(\-)\1+/gi, "-");
				
				$(".content-modal .jcarousel-clip-horizontal ul li.active p.link-decathlon a").attr('onclick', '_gaq.push(["_trackEvent", "link-site", "'+prodClic+'", "clique"])');
							
				/* BOTÃO NEXT */
				$('.content-modal .jcarousel-next-horizontal').live('click', function(){
					calcPos ++;
					var nIten = $(".content-modal .jcarousel-clip-horizontal ul li").length
					if (calcPos > nIten){
						calcPos = nIten;
					};
					$(".content-modal .jcarousel-clip-horizontal ul li").removeClass('active');
					$(".content-modal .jcarousel-clip-horizontal ul").find('li').eq(calcPos).addClass('active');
					var prodClic = $(".content-modal .jcarousel-clip-horizontal ul li.active p.nome-prod").html().split('</span>')[1].toLowerCase();

					prodClic = prodClic.replace(/[á|ã|â|à]/gi, "a");
					prodClic = prodClic.replace(/[é|ê|è]/gi, "e");
					prodClic = prodClic.replace(/[í|ì|î]/gi, "i");
					prodClic = prodClic.replace(/[õ|ò|ó|ô]/gi, "o");
					prodClic = prodClic.replace(/[ú|ù|û]/gi, "u");
					prodClic = prodClic.replace(/[ç]/gi, "c");
					prodClic = prodClic.replace(/[ñ]/gi, "n");
					prodClic = prodClic.replace(/[á|ã|â]/gi, "a");
					prodClic = prodClic.replace(/\W/gi, "-");
					prodClic = prodClic.replace(/(\-)\1+/gi, "-");
					$(".content-modal .jcarousel-clip-horizontal ul li.active p.link-decathlon a").attr('onclick', '_gaq.push(["_trackEvent", "link-site", "'+prodClic+'", "clique"])');
				});

				
				/* BOTÃO PREV */
				$('.content-modal .jcarousel-prev-horizontal').live('click', function(){
					calcPos --;
					if (calcPos < 0){
						calcPos = 0;
					};
					$(".content-modal .jcarousel-clip-horizontal ul li").removeClass('active');
					$(".content-modal .jcarousel-clip-horizontal ul").find('li').eq(calcPos).addClass('active');
					var prodClic = $(".content-modal .jcarousel-clip-horizontal ul li.active p.nome-prod").html().split('</span>')[1].toLowerCase();

					prodClic = prodClic.replace(/[á|ã|â|à]/gi, "a");
					prodClic = prodClic.replace(/[é|ê|è]/gi, "e");
					prodClic = prodClic.replace(/[í|ì|î]/gi, "i");
					prodClic = prodClic.replace(/[õ|ò|ó|ô]/gi, "o");
					prodClic = prodClic.replace(/[ú|ù|û]/gi, "u");
					prodClic = prodClic.replace(/[ç]/gi, "c");
					prodClic = prodClic.replace(/[ñ]/gi, "n");
					prodClic = prodClic.replace(/[á|ã|â]/gi, "a");
					prodClic = prodClic.replace(/\W/gi, "-");
					prodClic = prodClic.replace(/(\-)\1+/gi, "-");
					$(".content-modal .jcarousel-clip-horizontal ul li.active p.link-decathlon a").attr('onclick', '_gaq.push(["_trackEvent", "link-site", "'+prodClic+'", "clique"])');
				});
				
			});		
						
			function showModal(){				
				$('.'+getRel+' .carousel-modal').hide().fadeIn(200);
			}
			
			$('a#close, #overlay-modal').bind('click', function(e){			
				e.preventDefault();
				$('#overlay-modal').fadeOut('fast');
				$('.content-modal, .link-decathlon, a#close').hide();
				$('.container-modal').hide(function(){
					$('.content-modal.'+ getRel).empty().append(such.BLOCO[splitPos -1]);					
				});
			});
		});

		
		
		$('.bloco .jcarousel-skin-tango .jcarousel-container-horizontal .jcarousel-next-horizontal').live('click', function(){
			var titCat = $(this).parents('.bloco').find('.tit-main').html().toLowerCase();

				titCat = titCat.replace(/[á|ã|â|à]/gi, "a");
				titCat = titCat.replace(/[é|ê|è]/gi, "e");
				titCat = titCat.replace(/[í|ì|î]/gi, "i");
				titCat = titCat.replace(/[õ|ò|ó|ô]/gi, "o");
				titCat = titCat.replace(/[ú|ù|û]/gi, "u");
				titCat = titCat.replace(/[ç]/gi, "c");
				titCat = titCat.replace(/[ñ]/gi, "n");
				titCat = titCat.replace(/[á|ã|â]/gi, "a");
				titCat = titCat.replace(/\W/gi, "-");
				titCat = titCat.replace(/(\-)\1+/gi, "-");
				
			$('.bloco .jcarousel-skin-tango .jcarousel-container-horizontal .jcarousel-next-horizontal').attr('onclick','_gaq.push(["_trackEvent", "'+titCat+'", "navegacao", "flecha"]);')
		});

		$('.bloco .jcarousel-skin-tango .jcarousel-container-horizontal .jcarousel-prev-horizontal').live('click', function(){
			var titCat = $(this).parents('.bloco').find('.tit-main').html().toLowerCase();

				titCat = titCat.replace(/[á|ã|â|à]/gi, "a");
				titCat = titCat.replace(/[é|ê|è]/gi, "e");
				titCat = titCat.replace(/[í|ì|î]/gi, "i");
				titCat = titCat.replace(/[õ|ò|ó|ô]/gi, "o");
				titCat = titCat.replace(/[ú|ù|û]/gi, "u");
				titCat = titCat.replace(/[ç]/gi, "c");
				titCat = titCat.replace(/[ñ]/gi, "n");
				titCat = titCat.replace(/[á|ã|â]/gi, "a");
				titCat = titCat.replace(/\W/gi, "-");
				titCat = titCat.replace(/(\-)\1+/gi, "-");
				
			$('.bloco .jcarousel-skin-tango .jcarousel-container-horizontal .jcarousel-next-horizontal').attr('onclick','_gaq.push(["_trackEvent", "'+titCat+'", "navegacao", "flecha"]);')	
		});
	}
});