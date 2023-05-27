const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/message.proto';

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const greetingProto = grpc.loadPackageDefinition(packageDefinition).grpc.demo;

const client = new greetingProto.GreetingService('localhost:50051',
    grpc.credentials.createInsecure());

const request = { message: 'World' };
client.sayHello(request, function(err, response) {
    console.log('Greeting:', response.message);
});