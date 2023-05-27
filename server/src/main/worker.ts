import { parentPort } from 'worker_threads';

parentPort.on('message', message => {
  console.log('Received message from main thread:', message);
});
// console.log('Hello from worker!');
parentPort.postMessage('Worker finished.');