/* global jQuery */
jQuery(function($) {
    var lefts = $('.saup-group input.korean-first');
    var middle = $('.saup-group input.korean-middle');
    var rights = $('.saup-group input.korean-last');

    $('.saup-group').each(function(idx, group) {
        $(group).find('input').synchronize();
    });

    $('.saup-group input').on('change', function(e) {
        var validate_code = [1,3,7,1,3,7,1,3,5.5];
       // TODO:
        // 10 - sum( 1 3 7 1 3 7 1 3 5.5 ) % 10
    });

});