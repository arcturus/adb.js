var DebugBridge = require('./adb.js').DebugBridge;


var adb = new DebugBridge();
adb.getVersion(function (version) {
    console.log('Android Debug Bridge version 1.0.%d', version);
});

adb.listDevices(function (devices) {
    console.log('found %d device %s', devices.length, devices);
});


adb.traceDevice(function (devices) {
    console.log('found %d device %s', devices.length, devices);

    for (var i=0; i<devices.length; i++) {
        var device = devices[i];
        device.takeSnapshot(function (frame) {
            frame.writeImageFile('snapshot.gif');
        });
  
        device.getSyncService(function (svc) {
            svc.pullFile('/system/framework/framework.odex', './framework.odex', function (size) {
                console.log("pull %d bytes file", size);
            });
        });
    }
});

adb.debug = true;
adb.traceDevice(function onDevices(devices) {
    console.log('Found ' + devices.length + ' devices');
    for (var i = 0; i < devices.length; i++) {
        var device = devices[i];
        device.logcat();
    }
});


adb.traceDevice(function onDevices(devices) {
    for (var i = 0; i < devices.length; i++) {
        var device = devices[i];
        device.shellCmd('ls', ['/'], function onCmd(data) {
            console.log(data.toString());
        })
    }
});