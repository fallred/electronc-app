"use strict";
// @ts-nocheck
// client.js
// const grpc = require('grpc');
// const protoLoader = require('@grpc/proto-loader');
exports.__esModule = true;
// const packageDefinition = protoLoader.loadSync('example.proto');
// const Example = grpc.loadPackageDefinition(packageDefinition).example.Example;
// const client = new Example(
//     'localhost:50051',
//     grpc.credentials.createInsecure()
// );
// client.Add({ x: 2, y: 3 }, (err, response) => {
//     if (err) {
//         console.error(err);
//     } else {
//     console.log('Result:', response.result);
//     }
// });
var path = require("path");
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
// const PROTO_PATH = './helloworld.proto'; // Protocol Buffers 定义文件路径
var PROTO_PATH = path.join(__dirname, 'helloworld.proto');
var packageDefinition = protoLoader.loadSync(PROTO_PATH);
var hellowordPackage = grpc.loadPackageDefinition(packageDefinition).helloworld;
var client = new hellowordPackage.Greeter('localhost:50054', grpc.credentials.createInsecure());
var request = { name: 'zqh' };
client.SayHello(request, function (error, response) {
    if (error) {
        console.error(error);
        return;
    }
    console.log("Result: ".concat(response.message));
});
//# sourceMappingURL=grpc-client.js.map