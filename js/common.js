head.ready(function() {

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
			scale = $('.js-scale');
		// move
		function moveTo (el) {
			var index = el.index(),
				dataPreview = el.data('preview'),
				dataMonth = el.data('month');
			if (index == 0) {
				btnPrev.addClass('is-disabled');
			}
			else {
				btnPrev.removeClass('is-disabled');
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
		// preview item click
		previewItem.on('click', function () {
			var dataTime = $(this).data('time'),
				elTime = $('.' + dataTime);
			// move
			moveTo(elTime);
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
			container.removeClass('is-upper-show');
			return false;
		});
	}());

	// letsgo
	(function () {
		var letsgo = $('.js-letsgo'),
			wh = $(window).height();
		letsgo.on('click', function () {
			$('body').animate({
				scrollTop: wh
			}, 700);
		});
		var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
		$(window).bind(mousewheelevt, function(e){
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
		var num = $('.articlepic').length;
		function getcurrent(){
			bh = $('.wrapper').height();
			wh = $(window).height();
			st = $(window).scrollTop();
			space = bh - wh;
			step = space/num;
			stepsdone = (st - 10)/step;
			slidetoshow = Math.abs(parseInt(stepsdone));
			$('.cycle-slideshow').cycle('goto', slidetoshow);
		}
		$(window).scroll(function(event) {
			getcurrent();
		});
		getcurrent();
	};
});