$(document).ready(function () {

	// Инициализация WOW скрипта для анимаций при скролле
	new WOW().init();

	// Запрет автоповорота экрана
	screen.orientation.lock('portrait');

	// Инициализация слайдеров 
	$('.header__slider').slick({
		infinite: true,
		fade: true,
		prevArrow: $('.slick-prev'),
		nextArrow: $('.slick-next'),
		asNavFor: '.slider-dots',
	});

	$('.slider-dots').slick({
		slidesToShow: 4,
		slidesToScroll: 4,
		asNavFor: '.header__slider',
	});

	$('.surf__slider').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		prevArrow: $('.surf__slick-prev'),
		nextArrow: $('.surf__slick-next'),
		focusOnSelect: true,
		asNavFor: '.slider-map , .travel__slider',
		responsive: [
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 450,
				settings: {
					slidesToShow: 1,
					centerMode: true,
				}
			}
		]
	});

	$('.slider-map').slick({
		slidesToShow: 8,
		slidesToScroll: 1,
		arrows: false,
		asNavFor: '.surf__slider , .travel__slider',
		focusOnSelect: true,
	});

	$('.travel__slider').slick({
		prevArrow: $('.travel__slick-prev'),
		nextArrow: $('.travel__slick-next'),
		fade: true,
		asNavFor: '.surf__slider , .slider-map',
	});

	$('.sleep__slider').slick({
		prevArrow: $('.holder__slick-prev'),
		nextArrow: $('.holder__slick-next'),
		fade: true,
		// asNavFor: '.surf__slider , .slider-map',
	});

	$('.shop__slider').slick({
		prevArrow: $('.shop__slick-prev'),
		nextArrow: $('.shop__slick-next'),
	});


	//Меню nav добавление класса по клику
	const nav = document.querySelector('.nav');
	const navMenu = document.querySelector('.menu');
	const menuBtnActive = document.querySelector('.menu-btn');
	menuBtnActive.addEventListener('click', (event) => {
		nav.classList.toggle('open');
		navMenu.classList.toggle('activeMenu');
		menuBtnActive.classList.toggle('menuBtnActive');
	});

	// Вывод активным слайд вторым - изменяет паддинг в зависимости от ширины слайда
	let mediaQueryWidth = window.matchMedia('(min-width: 700px)');
	if (mediaQueryWidth.matches && $(window).resize(function () { $(window).width() > 700 })) {
		const parentTrack = document.querySelector('.surf__slider');
		let childTrack = parentTrack.querySelector('.surf-box'),
			childTrackStyle = window.getComputedStyle(childTrack),
			childTrackWidth = childTrackStyle.getPropertyValue('width');
		let slickTrackPadding = parentTrack.querySelector('.slick-track');
		slickTrackPadding.style.paddingLeft = childTrackWidth;
		console.log($(window).width());
	}




	//Получение Даты и вывод в header
	const headerYear = document.querySelector('.header__aside-date-year');
	const headerMonth = document.querySelector('.header__aside-date-month');
	const headerDay = document.querySelector('.header__aside-date-day');


	const Data = new Date();
	const year = Data.getFullYear();
	let month = Data.getMonth();
	month += 1;
	const day = Data.getDate();

	headerYear.innerText = year;
	headerMonth.innerText = month < 10 ? '0' + month : month;
	headerDay.innerText = day < 10 ? '0' + day : day;



	const sleepSlider = document.querySelector('.section__sleep');

	// Подсчет цены за гостей и ночи в отеле при загрузке страницы
	function calculatingPrice() {
		const slickCurrent = sleepSlider.querySelector('.slick-current');
		const priceParent = slickCurrent.querySelector('.holder-slider__info');
		const price = priceParent.querySelector('[data-cost]');

		let countOfNights = priceParent.querySelector('[data-nights]').value;
		let countOfGuests = priceParent.querySelector('[data-guests]').value;

		const currentCost = priceParent.querySelector('[data-cost]');
		const pricePerNight = currentCost.dataset.nightsPrice;
		const pricePerGuest = currentCost.dataset.guestsPrice;

		const totalPrice = parseInt(countOfNights) * parseInt(pricePerNight) + parseInt(countOfGuests) * parseInt(pricePerGuest);
		price.value = parseInt(totalPrice);
	}
	calculatingPrice()

	// Изменение числа при клике на + и -
	sleepSlider.addEventListener('click', function (event) {
		let counter;

		if (event.target.dataset.action === "plus" || event.target.dataset.action === "minus") {

			const counterWrapper = event.target.closest('.holder-slider__info-title');

			counter = counterWrapper.querySelector('[data-counter]');

			let maxValue = counter.getAttribute('max');
			let minValue = counter.getAttribute('min');
			let counterValue = counter.value;

			if (event.target.dataset.action === "plus" && parseInt(counterValue) < maxValue) {
				counter.value = ++counter.value
			}

			if (event.target.dataset.action === "minus" && parseInt(counterValue) > minValue) {
				counter.value = --counter.value
			}
			// Подсчет цены за гостей и ночи в отеле при изменении кол-ва гостей или ночей
			calculatingPrice()
		}
	})

	// + и - на доске в секции SHOP
	document.querySelectorAll('.surfboard-box__circle').forEach(i => i.addEventListener('click', event => {
		event.target.classList.toggle('active')
	}))
});


