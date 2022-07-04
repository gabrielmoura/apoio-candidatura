try{
    require( 'datatables.net-bs4' )();
    require( 'datatables.net-buttons-bs4' )();
    require( 'datatables.net-buttons/js/buttons.print.js' )();
    require( 'datatables.net-responsive-bs4' )();

var $  = require( 'jquery' );
var dt = require( 'datatables.net' )( window, $ );

}catch (e) {
}
