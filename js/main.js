$(document).ready(function(){

    let setup = null;
    
    $('#easy').on('click', function() {
        setup = new Setup(3);
        setup.build();
        $('#menu').css('display', 'none');
    });

    $('#gameboard').on('click', '.card', function (evt) {
        setup.check(evt.currentTarget);
    });
});