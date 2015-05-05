head.ready(function() {

	// main page
	(function () {
		var events = $('.js-events'),
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
			fullMonth = $('.js-full-month'),
			container = $('.js-container');
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
				timeList.css('transform', 'translate3d('+ -counter*timeWidth +'px,0,0)');
				// events
				events.css('transform', 'translate3d('+ -counter*eventsWidth +'px,0,0)');
				// preview
				if (timeNext.hasClass('is-interview')) {
					var previewAct = preview.find('.js-preview-item.is-active'),
						previewActNext = previewAct.next();
					previewItem.removeClass('is-active');
					previewActNext.addClass('is-active');
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
		fullMonth.on('click', function () {
			container.addClass('is-upper-show');
			return false;
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