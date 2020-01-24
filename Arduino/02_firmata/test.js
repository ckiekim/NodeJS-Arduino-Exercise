const Serialport = require("serialport");
const Firmata = require("firmata");
const board = new Firmata(new Serialport('COM4'), function() {
    board.pinMode(13, board.MODES.OUTPUT);  // 생략가능, default value is Output
    board.pinMode(2, board.MODES.INPUT);

    board.digitalRead(2, function(value) {
        console.log("The value of digital pin 2 changed to: " + value);

        board.digitalWrite(13, board.HIGH);
    })
});