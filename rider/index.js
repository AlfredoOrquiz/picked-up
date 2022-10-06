'use strict';

const io = require('socket.io-client');
const Chance = require('chance');

const url = process.env.SERVER_URL || 'http://localhost:3002/caps';
const chance = new Chance();

const socket = io.connect(url);

socket.emit('join', { clientId: 'rider' });

socket.emit('ride-request', {
  clientId: 'rider',
  orderId: chance.guid(),
  customerName: chance.name(),
  pickUpAddress: chance.address(),
  destination: chance.address(),
  passengers: 2
});

socket.on('ride-accepted', (payload) => console.log('ride accepted'));
socket.on('transit-to-rider', (payload) => console.log('driver on his way!'));
socket.on('arrival', (payload) => console.log('Driver is here'));
socket.on('picked-up', (payload) => console.log('Let\'s roll!'));
socket.on('transit-to-destination', (payload) => console.log('In route.'));
socket.on('arrival', (payload) => console.log('You have arrived to your destination'));
// socket.on('delivered', (payload) => {
//   console.log("THANKS!!!", payload.customerName);
// });
