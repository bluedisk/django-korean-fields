/* global jQuery */

jQuery.fn.synchronize = function() {
    var inputs = [];
    var limits = [];
    var last = this.length - 1;

    this.each(function(idx, input) {
        inputs.push(input);
        limits.push(parseInt($(input).attr('size')));
        $(input).data('order', idx);
    });

    this.on('keydown', function(e) {
        var idx = $(this).data('order');
        var limit = limits[idx];
        var cursor = this.selectionStart;
        var key = e.keyCode;

        // move next at end, not last
        if ( idx !== last && cursor === limit && key !== 8 && key !== 37) {
            var next = inputs[idx+1];
            $(next).focus();
            next.selectionStart = 0;
            next.selectionEnd = 0;

            if ( key === 39 ) return false;
        }

        // move forward at start, not first
        if ( idx !== 0 && cursor === 0 && (key === 8 || key === 37)) {
            var prev = inputs[idx-1];
            var prev_limit = limits[idx-1];
            $(prev).focus();
            prev.selectionStart = prev_limit;
            prev.selectionEnd = prev_limit;

            if ( key === 37 ) return false;
        }
    });

    this.on('keyup', function(e) {
        var idx = $(this).data('order');
        var limit = limits[idx];
        var origin = $(this).val();
        var value = origin.replace(/[^0-9]+|-/,'');
        var cursor = this.selectionStart;

        // clean-up
        if ( origin !== value ) {
            $(this).val(value);
            this.selectionStart = cursor;
            this.selectionEnd = cursor;
        }

        // underflow
        if ( idx !== last && value.length < limit ) {
            for ( var i = idx+1 ; i < inputs.length ; i++ ) {
                value += $(inputs[i]).val();
                $(inputs[i]).val('');
            }

            $(this).val(value);
            this.selectionStart = cursor;
            this.selectionEnd = cursor;
        }

        // overflow
        if ( value.length > limit ) {
            $(this).val(value.substring(0, limit));
            this.selectionStart = cursor;
            this.selectionEnd = cursor;

            var to_next = value.substring(limit);
            for ( var i = idx+1 ; i < inputs.length && to_next.length > 0 ; i++ ) {
                var now = $(inputs[i]);
                var now_limit = limits[i];
                var now_val = to_next + now.val();

                now.val(now_val.substring(0, now_limit));
                to_next = now_val.substring(now_limit)
            }
        }
    });

};