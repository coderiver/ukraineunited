head.ready(function() {

	// main page
	(function () {
		var events = $('.js-events'),
			eventsWidth = 400,
			time = $('.js-time'),
			timeList = time.find('.js-time-list'),
			timeNext = time.find('.js-time-next'),
			timePrev = time.find('.js-time-prev'),
			timeDay = time.find('.js-time-day'),
			timeWidth = 19,
			preview = $('.js-preview'),
			previewItem = preview.find('.js-preview-item'),
			previewWidth = 164,
			counter = 1,
			counterPreview = 1;
		timeNext.on('click', function () {
			// time
			var timeAct = time.find('.js-time-day.is-active'),
				timeNext = timeAct.next();
			timeAct.removeClass('is-active');
			timeNext.addClass('is-active');
			timeList.css('-webkit-transform', 'translate3d('+ -counter*timeWidth +'px,0,0)');
			// events
			events.css('-webkit-transform', 'translate3d('+ -counter*eventsWidth +'px,0,0)');
			// preview
			if (timeNext.hasClass('is-interview')) {
				var previewAct = preview.find('.js-preview-item.is-active');
				previewItem.removeClass('is-active');
				previewAct.next().addClass('is-active');
				preview.css('-webkit-transform', 'translate3d('+ -counterPreview*previewWidth +'px,0,0)');
				counterPreview++;
			};
			// 
			counter++;
			// 
			return false;
		});
	}());

});