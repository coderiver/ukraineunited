head.ready(function() {

	// main page
	(function () {
		var events = $('.js-events'),
			eventsItem = events.find('>div'),
			eventsWidth = 400,
			time = $('.js-time'),
			timeList = time.find('.js-time-list'),
			btnNext = $('.js-next'),
			btnPrev = $('.js-prev'),
			timeDay = time.find('.js-time-day'),
			timeWidth = 19,
			preview = $('.js-preview'),
			previewItem = preview.find('.js-preview-item'),
			previewWidth = 164,
			counter = 0,
			counterPreview = 0,
			month = $('.js-month'),
			monthItem = $('.js-month > li'),
			fullMonth = $('.js-full-month'),
			container = $('.js-container'),
			scale = $('.js-scale');
		// next
		btnNext.on('click', function () {
			if (btnPrev.hasClass('is-disabled')) {
				btnPrev.removeClass('is-disabled');
			};
			// time
			var timeAct = time.find('.js-time-day.is-active'),
				timeNext = timeAct.next();
			if (timeNext.length) {
				// time
				timeAct.removeClass('is-active');
				timeNext.addClass('is-active');
				counter = timeNext.prevAll().length;
				eventsItem.removeClass('is-active');
				eventsItem.eq(counter).addClass('is-active');
				timeList.css('transform', 'translate3d('+ -counter*timeWidth +'px,0,0)');
				// events
				events.css('transform', 'translate3d('+ -counter*eventsWidth +'px,0,0)');
				// preview
				if (timeNext.hasClass('is-interview')) {
					var previewAct = preview.find('.js-preview-item.is-active'),
						previewActNext = previewAct.next();
					previewItem.removeClass('is-active');
					previewActNext.addClass('is-active');
					previewActNext.prevAll().addClass('is-prev');
					counterPreview = previewActNext.prevAll().length;
					preview.css('transform', 'translate3d('+ -counterPreview*previewWidth +'px,0,0)');
				};
				// month
				if (timeNext.data('month') == 'next') {
					month.each(function () {
						var thisEl = $(this),
							item = thisEl.find('li'),
							act = thisEl.find('.is-active'),
							actNext = act.next();
						act.removeClass('is-active');
						if (actNext.length) {
							actNext.addClass('is-active');
						}
						else {
							item.first().addClass('is-active');
						}
					});
				};
			}
			else {
				btnNext.addClass('is-disabled');
			}
			return false;
		});
		btnPrev.on('click', function () {
			if (btnNext.hasClass('is-disabled')) {
				btnNext.removeClass('is-disabled');
			};
			// time
			var timeAct = time.find('.js-time-day.is-active'),
				timePrev = timeAct.prev();
			if (timePrev.length) {
				// time
				timeAct.removeClass('is-active');
				timePrev.addClass('is-active');
				counter = timePrev.prevAll().length;
				eventsItem.removeClass('is-active');
				eventsItem.eq(counter).addClass('is-active');
				timeList.css('transform', 'translate3d('+ -counter*timeWidth +'px,0,0)');
				// events
				events.css('transform', 'translate3d('+ -counter*eventsWidth +'px,0,0)');
				// preview
				if (timePrev.hasClass('is-interview')) {
					var previewAct = preview.find('.js-preview-item.is-active'),
						previewActNext = previewAct.prev();
					previewItem.removeClass('is-active');
					previewActNext.addClass('is-active');
					counterPreview = previewActNext.prevAll().length;
					preview.css('transform', 'translate3d('+ -counterPreview*previewWidth +'px,0,0)');
				};
				// month
				if (timePrev.data('month') == 'prev') {
					month.each(function () {
						var thisEl = $(this),
							item = thisEl.find('li'),
							act = thisEl.find('.is-active'),
							actPrev = act.prev();
						act.removeClass('is-active');
						if (actPrev.length) {
							actPrev.addClass('is-active');
						}
						else {
							item.last().addClass('is-active');
						}
					});
				};
			}
			else {
				btnPrev.addClass('is-disabled');
			}
			return false;
		});
		// 
		previewItem.on('click', function () {
			var thisEl = $(this),
				attr = $(this).data('day');
				attrEl = $('.' + attr),
				attrIndex = attrEl.index(),
				commonCounter = attrEl.prevAll().length,
				previewItemCounter = thisEl.prevAll().length;
			previewItem.removeClass('is-active');
			thisEl.addClass('is-active');

			previewItem.removeClass('is-prev');
			attrEl.prevAll().addClass('is-prev');

			timeDay.removeClass('is-active');
			timeDay.eq(attrIndex).addClass('is-active');

			eventsItem.removeClass('is-active');
			eventsItem.eq(attrIndex).addClass('is-active');

			if (thisEl.hasClass('is-prev')) {
				preview.css('transform', 'translate3d('+ previewItemCounter*previewWidth +'px,0,0)');
				// 
				timeList.css('transform', 'translate3d('+ commonCounter*timeWidth +'px,0,0)');
				// events
				events.css('transform', 'translate3d('+ commonCounter*eventsWidth +'px,0,0)');
			}
			else {
				preview.css('transform', 'translate3d('+ -previewItemCounter*previewWidth +'px,0,0)');
				// 
				timeList.css('transform', 'translate3d('+ -commonCounter*timeWidth +'px,0,0)');
				// events
				events.css('transform', 'translate3d('+ -commonCounter*eventsWidth +'px,0,0)');
			};
			return false;
		});
		// 
		monthItem.on('click', function () {
			var thisEl = $(this),
				attr = thisEl.data('day'),
				attrEl = $('.' + attr),
				attrIndex = attrEl.index(),
				commonCounter = attrEl.prevAll().length;

			timeDay.removeClass('is-active');
			timeDay.eq(attrIndex).addClass('is-active');

			eventsItem.removeClass('is-active');
			eventsItem.eq(attrIndex).addClass('is-active');

			if (thisEl.parent().hasClass('is-prev')) {
				// 
				timeList.css('transform', 'translate3d('+ commonCounter*timeWidth +'px,0,0)');
				// events
				events.css('transform', 'translate3d('+ commonCounter*eventsWidth +'px,0,0)');
				// 
				month.each(function () {
					var thisEl = $(this),
						item = thisEl.find('li'),
						act = thisEl.find('.is-active'),
						actPrev = act.prev();
					act.removeClass('is-active');
					if (actPrev.length) {
						actPrev.addClass('is-active');
					}
					else {
						item.last().addClass('is-active');
					}
				});
				// 
				if (attrEl.hasClass('is-interview')) {
					
				};
			}
			else {
				// 
				timeList.css('transform', 'translate3d('+ -commonCounter*timeWidth +'px,0,0)');
				// events
				events.css('transform', 'translate3d('+ -commonCounter*eventsWidth +'px,0,0)');
				// 
				month.each(function () {
					var thisEl = $(this),
						item = thisEl.find('li'),
						act = thisEl.find('.is-active'),
						actNext = act.next();
					act.removeClass('is-active');
					if (actNext.length) {
						actNext.addClass('is-active');
					}
					else {
						item.first().addClass('is-active');
					}
				});
			};
		});
		// 
		fullMonth.on('click', function () {
			container.addClass('is-upper-show');
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
		    }   
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
	}
});