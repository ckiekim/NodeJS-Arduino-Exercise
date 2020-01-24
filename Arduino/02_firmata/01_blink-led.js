const five = require('johnny-five');
var board = new five.Board();

board.on("ready", function() {
    console.log("Arduino board is ready!");
    let led = new five.Pin(13);
    let state = 0x00;

    const iv = setInterval(function() {
        led.write(state ^= 0x01);
    }, 400);

    setTimeout(function() {
        clearInterval(iv);
        led.write(0);
    }, 5000);
});