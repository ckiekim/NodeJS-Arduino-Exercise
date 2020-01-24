const five = require('johnny-five');
var board = new five.Board();

board.on("ready", function() {
    console.log("Arduino board is ready!");
    let cds = new five.Sensor({
        pin: 'A0',
        freq: 500
    });
    cds.on("change", function() {
        console.log('cds -', this.value);
    });

    //let dht = new five.Sensor.Digital(2);

    /* const iv = setInterval(function() {
    }, 2000);

    setTimeout(function() {
        clearInterval(iv);
    }, 10000); */
});