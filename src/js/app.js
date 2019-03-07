/* 
@codekit-prepend quiet '../../node_modules/jquery/dist/jquery.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.core.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.util.mediaQuery.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.util.box.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.util.triggers.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.util.keyboard.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.util.motion.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.abide.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.reveal.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.offcanvas.min';
*/

$(document).foundation();

$('#menu').on('opened.zf.offcanvas', () => {
    $('.header_hamb').addClass('is_active');
    $('.menu--header').addClass('fixed');
}).on('closed.zf.offcanvas', () => {
    $('.header_hamb').removeClass('is_active');
    $('.menu--header').removeClass('fixed');
});

$('.team_header').click(function() {
    $(this).toggleClass('is_open')
})