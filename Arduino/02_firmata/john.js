const five = require('johnny-five');
const temporal = require('temporal');
var board = new five.Board();

board.on("ready", function() {
    console.log("Arduino board is ready!");
    //let led = new five.Led(13);
    //let ledRGB = new five.Led.RGB([7, 6, 5]);
    //led.blink(500);
    //ledRGB.strobe(500);
    let led = new five.Pin(13);
    temporal.loop(500, function(loop) {
        led[loop.called % 2 == 0 ? "high" : "low"]
    });
});