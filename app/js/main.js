$(document).ready(function(){
	
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	/*Top menu*/

	$('.top-menu__link').click(function(){
		if(isMobile){
			if( $(this).parent().is('.top-menu__item--parent') ){
				$(this).parent().toggleClass('top-menu__link--active').find('.top-menu__dropdown').slideToggle();
				return false;
			}
		}
	});

	/*Main Menu*/

	var toTop;

	$('.toggle-menu').click(function(){
		toTop = $(window).scrollTop();
		var	height = $(document).height();
		$('body').toggleClass('blocked');
		$(this).toggleClass('toggle-menu--active');
		$('.toggle-menu__caret-icon').toggleClass('toggle-menu__caret-icon--transform');
		$('.menu-container').toggleClass('menu-container--visible').height( $(window).height() );
		return false;
	});

	$('.main-menu__link').click(function(){
		if(isMobile){
			if( $(this).parent().is('.main-menu__item--parent') ){
				$(this).toggleClass('main-menu__link--active').parent().find('.main-menu__dropdown').slideToggle();
				return false;
			}
		}
	});

	$(window).resize(function(){
		if( $(window).width() >= 1170 ){
			$('body').removeClass('blocked');
			$('.toggle-menu').removeClass('toggle-menu--active');
			$('.main-menu__link').removeClass('main-menu__link--active');
			$('.toggle-menu__caret-icon').removeClass('toggle-menu__caret-icon--transform');
			$('.menu-container').removeAttr('style').removeClass('menu-container--visible');
			/**/
			$('.top-menu__dropdown').removeAttr('style');
			$('.top-menu__link').removeClass('main-menu__link--active');
			$('.main-menu__dropdown').removeAttr('style');
		} else {
			$('.menu-container').css({'height' : $(window).height()});
		}
	});

	$('.upper__btn').click(function(){
		var block = $( $(this).attr('href') ),
			block_offset = block.offset().top;
		$('html, body').animate({ scrollTop : block_offset }, 1000);
		return false;
	});

	$('.portfolio__slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		prevArrow: '<a href="#" class="portfolio__nav portfolio__nav--prev"><span class="portfolio__arrow portfolio__arrow--prev"></span></a>',
		nextArrow: '<a href="#" class="portfolio__nav portfolio__nav--next"><span class="portfolio__arrow portfolio__arrow--next"></span></a>',
		responsive: [
			{
			breakpoint: 991,
				settings: {
					slidesToShow: 2
				}
			},
			{
			breakpoint: 768,
				settings: {
					slidesToShow: 1
				}
			},
			{
			breakpoint: 480,
				settings: {
					slidesToShow: 1,
					arrows: false
				}
			}
		]
	});

	$('.catalog__inner, .category__inner').matchHeight();

	/*Compare*/

	$('.compare-modal').fancybox({
		padding: [26,0,30,0],
		margin: 0,
		wrapCSS: 'compare_modal',
		fitToView: false,
		helpers: {
			overlay : {
				css : {
					'background-color' : 'rgba(58,129,155,0.9)',
					'background-image' : 'none'
				}
			}
		}
	});

	/*Tooltip*/

	$('.tooltipstered').tooltipster({
		contentCloning: true,
		delay: 100,
		animationDuration: 100
	});

	/*Product slider*/

	$('.slider__nav').slick({
		slidesToShow: 6,
		slidesToScroll: 1,
		arrows: true,
		focusOnSelect: true,
		infinite: false,
		asNavFor: '.slider__main',
		prevArrow: '<a href="#" class="slider__arrow slider__arrow--prev"><span></span></a>',
		nextArrow: '<a href="#" class="slider__arrow slider__arrow--next"><span></span></a>',
		responsive: [
			{
			breakpoint: 1400,
				settings: {
					slidesToShow: 5
				}
			},
			{
			breakpoint: 1170,
				settings: {
					slidesToShow: 4
				}
			},
			{
			breakpoint: 568,
				settings: {
					slidesToShow: 3
				}
			},
			{
			breakpoint: 480,
				settings: {
					slidesToShow: 2
				}
			}
		]
	});

	$('.slider__main').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.slider__nav',
		dots: false,
		centerMode: false,
		focusOnSelect: false,
		arrows: false,
		infinite: false,
		fade: true
	});

	/*Calc*/

	/*Square*/

	var square = $('#square_slider'),
		squareVal = parseInt(square.data('value')),
		squareMin = parseInt(square.data('min')),
		squareMax = parseInt(square.data('max')),
		squareMedium = parseInt(square.data('medium')),
		squareBig = parseInt(square.data('big'));

	$( "#square_slider" ).slider({
		range: "max",
		min: squareMin,
		max: squareMax,
		value: squareVal,
		slide: function( event, ui, min, max ) {
			$( "#square_value" ).html( ui.value );
			$( "#square_result" ).val( ui.value );
			calcSquare(ui.value, squareMedium, squareBig, squareMax);
		}
	});
	$( "#square_value" ).html( $( "#square_slider" ).slider( "value" ) );
	$( "#square_result" ).val( $( "#square_slider" ).slider( "value" ) );

	/*Budget*/

	$( "#budget_slider" ).slider({
		range: "max",
		min: 1000000,
		max: 10000000,
		value: 2200000,
		slide: function( event, ui ) {
			var sum = String(ui.value).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1,');
			$( "#price_value" ).html( sum );
			$( "#budget_result" ).val( sum );
		}
	});
	$( "#budget_result" ).val( $( "#budget_slider" ).slider( "value" ) );

	calcHome();
	calcSquare($( "#square_slider" ).slider("value"), squareMedium, squareBig, squareMax);
	
	/*Собираем данные*/

	var arr = [];
	$('.calc__group').each(function(){
		var index = $(this).index(),
			input = $(this).find('input[type="radio"]'),
			input_check = $(this).find('input[type="radio"]:checked'),
			input_label = input_check.parent().find('span').html();
		if( input_check ) arr.push(input_label);
		input.change(function(){
			calcHome();
			arr[index] = $(this).parent().find('span').html();
		});
	});

	$('input[name="project"]').change(function(){
		console.log($(this).val());
		if( $(this).val() === 'y' ){
			$('#calc_container').addClass('resizer');
		} else {
			$('#calc_container').removeClass('resizer');
		}
	});

	/*Sort catalog*/

	$('input[name="order"]').change(function(){
		var label = $(this).parent().find('span').data('group');
		console.log(label);
	});

	/*Map*/

	ymaps.ready(init);

});

/*UI slider result*/

function calcSquare(square, squareMedium, squareBig, squareMax) {
	square = parseInt(square);
	if(square >= squareMedium && square <= squareBig) {
		$('#calc_container').removeClass('calc-big').addClass('calc-medium');
	} else if(square >= squareBig && square <= squareMax) {
		$('#calc_container').removeClass('calc-medium').addClass('calc-big');
	} else {
		$('#calc_container').removeClass('calc-medium calc-big');
	}
}

/*Input calc result*/

function calcHome(){
	var lot = $('input[name="lot"]:checked').val() === 'y',
		floor = parseInt( $('input[name="floor"]:checked').val() ),
		project = parseInt( $('input[name="project"]') ),
		plinth = $('input[name="plinth"]:checked').val() === 'y';

	/*lot*/

	if( lot )
		$('#calc_ground').addClass('show');
	else
		$('#calc_ground').removeClass('show');

	/*plinth*/

	if( plinth )
		$('#calc_plinth').addClass('show');
	else
		$('#calc_plinth').removeClass('show');

	/*floor*/

	if(floor == 2)
		$('#calc_floors, #calc_roof').removeClass('calc-step-3').addClass('calc-step-2');
	else if(floor == 3)
		$('#calc_floors, #calc_roof').removeClass('calc-step-2').addClass('calc-step-3');
	else
		$('#calc_floors, #calc_roof').removeClass('calc-step-2 calc-step-3');
}

/*Map*/

function init () {
    var map = new ymaps.Map('map', {
            center: [54.7266,20.4824],
            zoom: 16,
            controls: []
        }, {
            searchControlProvider: 'yandex#search'
        }),

        BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="baloon">' +
                '<div class="baloon__head">Наши контакты</div>' +
                '<div class="baloon__label">Адрес:</div>' +
                '<div class="baloon__value">{{properties.address}}</div>' +
                '<div class="baloon__label">Номер телефона:</div>' +
                '<div class="baloon__value baloon__value--phone">{{properties.phone}}</div>' +
            '</div>', {
        });

	    var placemark = new ymaps.Placemark([54.7266, 20.4824], {
	    		address: 'г. Калининград, ул. Космонавта Леонова, 24', 
	    		phone: '+7 (900) 900-00-00', 
		    }, {
		        balloonContentLayout: BalloonContentLayout,
		        iconLayout: 'default#image',
	            iconImageHref: 'img/baloon-icon.png',
	            iconImageSize: [86, 95],
	            iconImageOffset: [-42, -90]
		    }
	    );
    map.geoObjects.add(placemark);
    map.behaviors.disable("scrollZoom");
}