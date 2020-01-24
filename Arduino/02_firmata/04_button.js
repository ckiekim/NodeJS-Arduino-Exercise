const five = require('johnny-five');
var board = new five.Board();

board.on("ready", function() {
    console.log("Arduino board is ready!");
    let button = new five.Button({
        pin: 2,
        invert: true,
        holdtime: 100
    });

    button.on("hold", function() {
        console.log( "Button held" );
    });
    button.on("press", function() {
        console.log( "Button pressed" );
    });
    button.on("release", function() {
        console.log( "Button released" );
    });
});