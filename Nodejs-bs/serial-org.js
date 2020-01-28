const SerialPort = require("serialport");
const sp = new SerialPort("COM4", { 
    baudRate:115200, autoOpen:false 
});

function timeDelay(timeout) {
	return new Promise(function(resolve) {
		setTimeout(resolve, timeout);
	});
}

sp.open(function() {
	timeDelay(1000);
	sp.on("error", function(error) {
		console.log("Error : ", error.message);
	});
	sp.on("data", function(data) {
		console.log(typeof(data));
		console.log("Received data : ", data);
	});

    let msg = 'A quick brown fox.';
	sp.write(msg, function(error) {
		if(error) {
			return console.log("Error on write : ", error.message);
		} else {
			console.log("메세지가 정상적으로 입력되었습니다.");
		}
	});
});