const SerialPort = require("serialport");
const Readline = require('@serialport/parser-readline');
const sp = new SerialPort("COM4", { 
    baudRate:115200, autoOpen:false 
});
const spp = sp.pipe(new Readline());	// Serial Port Parser
var sampleJsonData = `{"red":100,"green":180,"blue":150}`;

function timeDelay(timeout) {
	return new Promise(function(resolve) {
		setTimeout(resolve, timeout);
	});
} 

function remoteAct(cmd, jsonData, callback) {
	var readyFlag = true;
	sp.open(function() {
		spp.on("error", function(error) {
			console.log("Error : ", error.message);
		});
		spp.on("data", function(data) {
			//console.log(data.length);
			console.log(data);
			if (data === 'Ready') {
				if (readyFlag) {
					let command = '';
					if (cmd === 'PUT')
						command = `${cmd} ${jsonData}\n`;
					else
						command = `${cmd}\n`;

					sp.write(command, function(error) {
						if (error)
							console.log(cmd, 'error:', error.message);
						else
							console.log('Command', cmd);
					});
					readyFlag = false;
				}
			} else if (data === 'OK') {
				console.log("OK 수신");
				callback();
				sp.close();
			} else if (data === 'BAD') {
				console.log("BAD 수신");
			} else {
				
			}
		});
	});
}

function remoteInfo(cmd, callback) {
	var readyFlag = true;
	var result = '';
	sp.open(function() {
		spp.on("error", function(error) {
			console.log("Error : ", error.message);
		});
		spp.on("data", function(data) {
			//console.log(data.length);
			console.log(data);
			if (data === 'Ready') {
				if (readyFlag) {
					sp.write(cmd + '\n', function(error) {
						if (error)
							console.log(cmd, 'error:', error.message);
						else
							console.log('Command', cmd);
					});
					readyFlag = false;
				}
			} else if (data === 'OK') {
				console.log("OK 수신");
				callback(result);
				sp.close();
			} else if (data === 'BAD') {
				console.log("BAD 수신");
			} else {
				result = JSON.parse(data);
				console.log(result);
				sp.write('ACK\n', function(error) {
					if (error)
						console.log(cmd, 'error:', error.message);
					else
						console.log('Reply ACK');
				});
			}
		});
	});
}

remoteAct('PUT', sampleJsonData, function() {
	console.log('remoteAct PUT');
});
/* remoteInfo('GET', function(result) {
	console.log('remoteInfo GET');
}); */
/* remoteAct('OFF', '', function() {
	console.log('remoteAct OFF');
}); */