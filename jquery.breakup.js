;(function($, document, window, undefined) {
	'use strict';

	$.fn.breakup = function(options) {
		options = (options || {});
		var that = this;
		var length = parseInt(this.attr('maxlength'), 10);
		length = length / (options.lengths || 1);
		var maxLen = (options.lengths || 1);
		this.before('<div class="breakupInputs"></div>');
		var max = 0;
		for (var i = 0; i <= length - 1; i++) {
			$('.breakupInputs').append('<input type="text" class="splitUp" maxlength="'+maxLen+'" data-index="'+i+'"/>');
			max = i;
		}
		if (length !== Math.floor(length)) {
			$('.breakupInputs').append('<input type="text" class="splitUp" maxlength="'+(parseInt(this.attr('maxlength'), 10) % (options.lengths || 1))+'" data-index="'+(i)+'"/>');
		}
		$('input.splitUp').keyup(function () {
			if((event.keyCode < 33  ||  event.keyCode > 90) && event.keyCode !== 8 ){
				return ;
			} else {
				var nextIndex;
				if ($(this).val().length >= $(this).attr('maxlength')) {
					nextIndex = (parseInt($(this).attr('data-index'), 10) + 1);
					$('input[data-index='+nextIndex+']').focus();
				} else if ($(this).val().length === 0) {
					nextIndex = (parseInt($(this).attr('data-index'), 10) - 1);
					$('input[data-index='+nextIndex+']').focus();
				}
				that.val('');
				$('input.splitUp').each(function () {
					that.val(that.val() + $(this).val());
				});
			}
		});
	};

})(jQuery, document, window);