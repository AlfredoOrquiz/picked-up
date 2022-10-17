'use strict';

const io = require('socket.io-client');
const Chance = require('chance');

const url = process.env.SERVER_URL || 'http://localhost:3002/pickedup';
const chance = new Chance();

const socket = io.connect(url);

// socket.emit('join', { clientId: 'rider' });

socket.on('ride-request', (payload) => {
  console.log('yo');
  console.log(payload);
  let message = `I got you ${payload.customerName}, I'm on my way 🏎`;
  payload.message = message;
  setTimeout(() => {
    socket.emit('join', payload);
  }, 5000);

  setTimeout(() => {
    payload.message = `I'm here, come out!`;
    socket.emit('arrival-at-rider', payload);
  }, 10000);

  setTimeout(() => {
    socket.emit('picked-up', payload);
  }, 15000);

  setTimeout(() => {
    socket.emit('dropped-off', payload);
  }, 30000);
});

// socket.on('pickup', (payload) => {
//   console.log('ORDER PICKED UP', payload);

// socket.emit('transit-to-rider', payload);
// console.log('DRIVER IN TRANSIT', payload.orderId);
// socket.emit('arrival', payload);
// console.log('DRIVER HAS ARRIVED', payload.orderId);
// socket.emit('picked-up', payload);
// console.log('Driver has picked up the rider');
// socket.emit('transit-to-destination', payload);
// console.log('Driver in transit to drop-off location');
// socket.emit('destination-arrival', payload);
// console.log('Driver has arrived to your destination');
// socket.emit('Dropped-off', payload);
// console.log('Driver has dropped-off the rider');
// });
