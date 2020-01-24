const five = require('johnny-five');
var board = new five.Board();

board.on("ready", function() {
    console.log("Arduino board is ready!");
    let ledRGB = new five.Led.RGB([3, 6, 5]);
    let red, green, blue;

    const iv = setInterval(function() {
        red = Math.floor(Math.random() * 256);
        green = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);
        ledRGB.color(red, green, blue);
        console.log(red, green, blue);
    }, 500);

    setTimeout(function() {
        clearInterval(iv);
        ledRGB.color(0,0, 0);
    }, 10000);
});