var fieldH = $('#field').height();

function fitToSizeEnd() {
    fieldH = $('#field').height();
}

(function($) {
  $.fn.bottom = function(bottom) {
    
    var offsetTop = fieldH - this.offsetTop - this.offsetHeight;
    
    if (typeof bottom !== 'undefined') {
        offsetTop = fieldH - bottom - this.offsetHeight;
        this.offsetTop = offsetTop + 'px';
    }
    
    return offsetTop;
  };
})(jQuery);
