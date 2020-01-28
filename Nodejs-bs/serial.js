const SerialPort = require("serialport");
const Readline = require('@serialport/parser-readline');
const sp = new SerialPort("COM4", { 
    baudRate:115200, autoOpen:false 
});
const spp = sp.pipe(new Readline());	// Serial Port Parser

function timeDelay(timeout) {
	return new Promise(function(resolve) {
		setTimeout(resolve, timeout);
	});
}

sp.open(function() {
	timeDelay(1000);

	let msg = 'GET\n';
	sp.write(msg, function(error) {
		if(error) {
			return console.log("Error on write : ", error.message);
		} else {
			console.log("메세지가 정상적으로 송신되었습니다.");
		}
	});
	
	spp.on("error", function(error) {
		console.log("Error : ", error.message);
	});
	spp.on("data", function(data) {
		console.log(data.length);
		console.log(data);
	});
});