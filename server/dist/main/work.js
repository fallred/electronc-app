"use strict";
exports.__esModule = true;
var worker_threads_1 = require("worker_threads");
worker_threads_1.parentPort.on('message', function (message) {
    console.log('Received message from main thread:', message);
});
//# sourceMappingURL=work.js.map