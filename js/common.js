head.ready(function() {
	//begin navigation of all pages
	uberarray = [
		'article1.html',
		'article2.html',
		'article3.html',
		'article4.html',
		'article5.html',
		'article.html?1',
		'article.html?2',
		'article.html?3',
		'article.html?4'
	];
	$next = $('.article__next');
	$prev = $('.article__prev');
	bla = window.location.href.split('/');
	asd = bla[bla.length - 1];
	current = uberarray.indexOf(asd);
	console.log(current);
	if(current==0){
		$prev.hide();
	}
	if(current==uberarray.length-1){
		$next.hide();
	}
	$prev.click(function(event) {
		window.location = uberarray[current-1];
		return false;
	});
	$next.click(function(event) {
		window.location = uberarray[current+1];
		return false;
	});
	/// end of navigation




	// begin multilanguage
	if (localStorage.getItem("lang") === null) {
		localStorage["lang"] = 'eng';
	}
	else{
		$active = $('.lang__list a[data-lang='+localStorage["lang"]+']');
		$('.lang a').removeClass('is-active');
		$active.addClass('is-active')
		$('.lang__head').text($active.text());
		$('body').removeClass('eng rus ukr').addClass(localStorage["lang"]);
	}
	$('.lang__list a').click(function(event) {
		$(this).siblings().removeClass('is-active');
		$(this).addClass('is-active');
		$('.lang__head').text($(this).text());
		localStorage["lang"] = $(this).data('lang');
		$('body').removeClass('eng rus ukr').addClass(localStorage["lang"]);
		return false;
	});
	// end of multilanguage

	// main page
	(function () {
		var events = $('.js-events'),
			eventsItem = events.find('>div'),
			eventsWidth = 400,
			time = $('.js-time'),
			timeList = time.find('.js-time-list'),
			timeItem = $('.js-time-item'),
			timeWidth = 19,
			btnNext = $('.js-next'),
			btnPrev = $('.js-prev'),
			preview = $('.js-preview'),
			previewItem = preview.find('.js-preview-item'),
			previewWidth = 164,
			counter = 0,
			counterPreview = 0,
			month = $('.js-month'),
			monthItem = month.find('li'),
			fullMonth = $('.js-full-month'),
			container = $('.js-container'),
			scale = $('.js-scale'),
			init = $('.js-init'),
			initTime = init.data('time'),
			initTimeEl = $('.' + initTime),
			body = $('body');
			// move
			moveTo(initTimeEl);
		// move
		function moveTo (el) {
			var index = el.index(),
				elLength = timeItem.length,
				dataPreview = el.data('preview'),
				dataMonth = el.data('month');
			if (index == 0) {
				btnPrev.addClass('is-disabled');
			}
			else {
				btnPrev.removeClass('is-disabled');
			}
			if (index == (elLength - 1)) {
				btnNext.addClass('is-disabled');
			}
			else {
				btnNext.removeClass('is-disabled');
			}
			// month
			month.each(function () {
				var thisMonth = $(this),
					thisMonthItem = thisMonth.find('li');
				thisMonthItem.removeClass('is-active');
				if (thisMonth.hasClass('is-prev')) {
					var monthPrev = thisMonth.find('.' + dataMonth).prev();
					if (monthPrev.length) {
						monthPrev.addClass('is-active');
					}
					else {
						thisMonthItem.last().addClass('is-active');
					};
				};
				if (thisMonth.hasClass('is-center')) {
					thisMonth.find('.' + dataMonth).addClass('is-active');
				};
				if (thisMonth.hasClass('is-next')) {
					var monthNext = thisMonth.find('.' + dataMonth).next();
					if (monthNext.length) {
						monthNext.addClass('is-active');
					}
					else {
						thisMonthItem.first().addClass('is-active');
					};
				};
			});
			// time
			timeItem.removeClass('is-active');
			timeItem.eq(index).addClass('is-active');
			timeList.css('transform', 'translate3d('+ -index * timeWidth +'px,0,0)');
			// events
			eventsItem.removeClass('is-active');
			eventsItem.eq(index).addClass('is-active');
			events.css('transform', 'translate3d('+ -index * eventsWidth +'px,0,0)');
			// preview
			if (dataPreview != undefined) {
				var indexPreview = $('.' + dataPreview).index();
				previewItem.removeClass('is-active');
				previewItem.eq(indexPreview).addClass('is-active');
				preview.css('transform', 'translate3d('+ -indexPreview * previewWidth +'px,0,0)');
			};
		};
		moveTo(initTimeEl);
		// next button click
		btnNext.on('click', function () {
			if (!btnNext.hasClass('is-disabled')) {
				// time
				var timeAct = time.find('.js-time-item.is-active'),
					timeNext = timeAct.next();
				// move
				moveTo(timeNext);
				return false;
			};
		});
		// prev button click
		btnPrev.on('click', function () {
			if (!btnPrev.hasClass('is-disabled')) {
				// time
				var timeAct = time.find('.js-time-item.is-active'),
					timePrev = timeAct.prev();
				// move
				moveTo(timePrev);
				return false;
			};
		});
		// keyboard
		$(document).keydown(function(e) {
		    var btn = e.keyCode;
		    if (btn == 38 || btn == 39) {
		    	btnNext.trigger('click');
		    };
		    if (btn == 37 || btn == 40) {
		    	btnPrev.trigger('click');
		    };
		});
		// mouse wheel
		if (container.hasClass('is-upper-show')) {
			body.on('mousewheel', throttle(function (event){
				if(event.originalEvent.wheelDelta /120 > 0) {
					btnPrev.trigger('click');
				}
				else{
					btnNext.trigger('click');
				}
			}, 1300));
		};
		// preview item click
		previewItem.on('click', function () {
			if ($(this).hasClass('is-active')) {
				return true;
			};
			var dataTime = $(this).data('time'),
				elTime = $('.' + dataTime);
			// move
			moveTo(elTime);
			return false;
		});
		// month item click
		monthItem.on('click', function () {
			var dataTime = $(this).data('time'),
				elTime = $('.' + dataTime);
			// move
			moveTo(elTime);
			return false;
		});
		// toggle container items
		fullMonth.on('click', function () {
			container.addClass('is-upper-show');
			var dataTime = $(this).data('time'),
				elTime = $('.' + dataTime);
			// move
			moveTo(elTime);
			return false;
		});
		scale.on('click', function () {
			container.toggleClass('is-upper-show');
			return false;
		});
		container.toggleClass('is-upper-show');
	}());
	function debounce(fn, delay) {
	  var timer = null;
	  return function () {
	    var context = this, args = arguments;
	    clearTimeout(timer);
	    timer = setTimeout(function () {
	      fn.apply(context, args);
	    }, delay);
	  };
	}
	function throttle(fn, threshhold, scope) {
	  threshhold || (threshhold = 250);
	  var last,
	      deferTimer;
	  return function () {
	    var context = scope || this;

	    var now = +new Date,
	        args = arguments;
	    if (last && now < last + threshhold) {
	      // hold on to it
	      clearTimeout(deferTimer);
	      deferTimer = setTimeout(function () {
	        last = now;
	        fn.apply(context, args);
	      }, threshhold);
	    } else {
	      last = now;
	      fn.apply(context, args);
	    }
	  };
	}
	// letsgo
	(function () {
		var letsgo = $('.js-letsgo');
		letsgo.on('click', function () {
			var wh = $(window).height();
			$('body').animate({
				scrollTop: wh
			}, 700);
		});
		if(window.location.hash) {
			letsgo.trigger('click');
		  // Fragment exists
		  // alert(window.location.hash)
		}
		var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
		$(window).bind(mousewheelevt, function(e){
			console.log('aa');
		    var evt = window.event || e //equalize event object     
		    evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible               
		    var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF
		    if(delta > 0) {
		        //scroll up
		    }
		    else{
		        //scroll down
		        letsgo.trigger('click');
		    };
		});
	}());
	
	// article
	if ($('body').hasClass('is-article-page')) {
		var num = $('.slider__item').length;
		function getcurrent(){
			var bh = $('.wrapper').height(),
				sl = $('.cycle-slideshow'),
				wh = $(window).height(),
				st = $(window).scrollTop(),
				article = $('.js-article'),
				space = bh - wh,
				step = space/num,
				stepsdone = (st - 10)/step;
			slidetoshow = Math.abs(parseInt(stepsdone));
			sl.cycle('goto', slidetoshow);
			sl.hoverIntent(function () {
				var wndH = $(window).height(),
					wndW = $(window).width(),
					move = wndW/2 - wndW + wndH;
				if (wndW > 800 && move > 20) {
					article.addClass('is-moved');
					article.css('transform', 'translateX(' + -move + 'px)');
				};
			}, function () {
				var wndH = $(window).height(),
					wndW = $(window).width(),
					move = wndW/2 - wndW + wndH;
				if (wndW > 800 && move > 20) {
					article.removeClass('is-moved');
					article.css('transform', 'translateX(0px)');
				};
			});
		}
		$(window).scroll(function(event) {
			getcurrent();
		});
		getcurrent();
	};
});