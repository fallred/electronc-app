// @ts-nocheck
// client.js
// const grpc = require('grpc');
// const protoLoader = require('@grpc/proto-loader');

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

import * as path from "path";
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

// const PROTO_PATH = './helloworld.proto'; // Protocol Buffers 定义文件路径
const PROTO_PATH = path.join(__dirname, 'helloworld.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const hellowordPackage = grpc.loadPackageDefinition(packageDefinition).helloworld;

const client = new hellowordPackage.Greeter('localhost:50054', grpc.credentials.createInsecure());

const request = { name: 'zqh' };
client.SayHello(request, (error, response) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(`Result: ${response.message}`);
});