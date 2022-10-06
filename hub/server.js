'use strict';

const io = require('socket.io');
const PORT = process.env.PORT || 3002;

const server = io(PORT);
const caps = server.of('/caps'); // sockets connect http://localhost:3002/caps

console.log(`Server is listening on port: ${PORT}/caps`)

// this runs when a client connects to the caps server.
caps.on('connection', (socket) => {
  console.log('New Client connected!!');

  // join a room
  socket.on('join', (payload) => {
    socket.join(payload.clientId);
    console.log('Registered in room :', payload.clientId);
  });

  socket.on('ride-request', (payload) => {
    console.log(':: : event occurred : ride requested', payload);
    // emitting a notification to a room
    socket.to(payload.clientId).emit('ride-accepted', payload);
    console.log(':: : event occurred : ride accepted', payload);
    socket.to(payload.clientId).emit('transit-to-rider', payload)
    console.log(':: : event occurred : driver on the way', payload);
    socket.to(payload.clientId).emit('arrival', payload);
    console.log(':: : event occurred : driver arrived', payload);
    socket.to(payload.clientId).emit('picked-up', payload);
    console.log(':: : event occurred : driver has picked up the rider', payload);
    socket.to(payload.clientId).emit('transit-to-destination', payload);
    console.log(':: : event occurred : driver in transit to destination', payload);
    socket.to(payload.clientId).emit('destination-arrival', payload);
    console.log(':: : event occurred : driver arrived to destination', payload);
    socket.to(payload.clientId).emit('dropped-off', payload);
    console.log(':: : event occurred : driver has dropped-off the rider', payload);
  });

  socket.on('in-transit', (payload) => {
    console.log('EVENT OCCURRED :', 'in-transit', payload);
    // emitting a notification to a room
    socket.to(payload.clientId).emit('delivered', payload);
  });

  socket.on('delivered', (payload) => {
    console.log('EVENT OCCURRED :', 'delivered', payload);
    // emitting a notification to a room
    socket.to(payload.clientId).emit('delivered', payload);
  });
});
