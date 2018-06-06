/* global jQuery */
jQuery(function($) {
    var lefts = $('input.jumin-left');
    var rights = $('input.jumin-right');

    lefts.on('keydown', function(e) {
        var next = $(this).parents('.jumin-group').find('.jumin-right');
        var cursor = $(this)[0].selectionStart;

        if ( cursor === 6 && e.keyCode !== 8 && e.keyCode !== 37 ) {
            next.focus();
            next[0].selectionStart = 0;
            next[0].selectionEnd = 0;
        }
    });

    lefts.on('keyup', function(e) {
        var origin = $(this).val();
        var val = origin.replace(/[^0-9]+|-/,'');
        var next = $(this).parents('.jumin-group').find('.jumin-right');
        var cursor = $(this)[0].selectionStart;

        if ( val.length >= 6 ) {
            $(this).val(val.substring(0, 6));
            next.val(val.substring(6) + next.val());
            if ( cursor === 6 && e.keyCode !== 39) next.focus();
            else {
                $(this)[0].selectionStart = cursor;
                $(this)[0].selectionEnd = cursor;
            }

        } else if ( val.length < 6 && next.val().length !== 0 ) {
            var need = 6 - val.length;
            var get = next.val().substring(0, need);
            var left = next.val().substring(need);
            console.log("need:"+need+" => "+get+"//"+left);
            $(this).val(val + get);
            $(this)[0].selectionStart = cursor;
            $(this)[0].selectionEnd = cursor;
            next.val(left);

        } else if (origin !== val) {
            $(this).val(val);
        }

        $(this).parents('.jumin-group').removeClass('has-error');
        $(this).tooltip('hide');
    });

    rights.on('keyup', function(e) {
        var origin = $(this).val();
        var val = origin.replace(/[^0-9]+|-/,'').substring(0, 7);
        var cursor = $(this)[0].selectionStart;

        if ( cursor === 0 && (e.keyCode === 8 || e.keyCode === 37) ) {
            $(this).parents('.jumin-group').find('.jumin-left').focus();
        }
        if ( origin !== val ) {
            $(this).val(val);
        }

        $(this).parents('.jumin-group').removeClass('has-error');
        $(this).tooltip('hide');
    });

    // verifing

    lefts.on('blur', function(e) {
        var val = $(this).val();

        var error = check_jumin_date(val);
        if ( error ) {
            $(this).parents('.jumin-group').addClass('has-error');
            $(this).tooltip({
                trigger: 'manual',
                title: error
            });

            $(this).tooltip('show');
        }
    });

    rights.on('blur', function(e) {
        var rval = $(this).val();
        var lval = $(this).parents('.jumin-group').find('.jumin-left').val();

        if ( !check_jumin(lval+rval) ) {
            $(this).parents('.jumin-group').addClass('has-error');
            $(this).tooltip({
                trigger: 'manual',
                title: '잘못된 형식 입니다.'
            });

            $(this).tooltip('show');
        }
    });


    function check_jumin_date(val) {
        var year = parseInt(val.substring(0,2));
        var month = parseInt(val.substring(2,4));
        var days = parseInt(val.substring(4,6));

        if ( month < 1 || month > 12 ) {
            return '' + month + '는 잘못된 월 입니다.';
        }

        var last_day = new Date(2000+year, month, 0).getDate();
        if ( days < 1 || days > last_day ) {
            return '' + days + '는 잘못된 일자 입니다.';
        }

        return null;
    }

    function check_jumin(code) {
        if ( code.length !== 13 ) return false;

        var sum = 0;
        for ( var i = 0 ; i < code.length-1 ; i += 1) {
            sum += parseInt(code[i]) * ((i % 8)+2);
        }

        var checksum = (11 - (sum % 11)) % 10;
        return (parseInt(code[12]) === checksum);
    }
});