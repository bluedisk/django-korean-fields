/* global jQuery */
jQuery(function($) {

    // verifing
    $('.korean-group input').eq(0).on('blur', function(e) {
        var val = $(this).val();

        var error = check_jumin_date(val);
        if ( error ) {
            $(this).parents('.korean-group').addClass('has-error');
            $(this).tooltip({
                trigger: 'manual',
                title: error
            });

            $(this).tooltip('show');
        } else {
            $(this).parents('.korean-group').removeClass('has-error');
            $(this).tooltip('hide');
        }
    });

    $('.korean-group input').eq(1).on('blur', function(e) {
        var rval = $(this).val();
        var lval = $(this).parents('.korean-group').find('input.korean').eq(0).val();

        if ( rval !== '' && !check_jumin(lval+rval) ) {
            $(this).parents('.korean-group').addClass('has-error');
            $(this).tooltip({
                trigger: 'manual',
                title: '잘못된 형식 입니다.'
            });

            $(this).tooltip('show');
        } else {
            $(this).parents('.korean-group').removeClass('has-error');
            $(this).tooltip('hide');
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
        if ( code === '' ) return true;
        if ( code.length !== 13 ) return false;

        var sum = 0;
        for ( var i = 0 ; i < code.length-1 ; i += 1) {
            sum += parseInt(code[i]) * ((i % 8)+2);
        }

        var checksum = (11 - (sum % 11)) % 10;
        return (parseInt(code[12]) === checksum);
    }
});