'use strict';

const io = require('socket.io');
const eventPool = require('./eventPool');
const PORT = process.env.PORT || 3002;

const server = io(PORT);
const pickedUp = server.of('/pickedup'); // sockets connect http://localhost:3002/pickedup
console.log(`Server is listening on port: ${PORT}/pickedup`);

// this runs when a client connects to the pickedup server.
pickedUp.on('connection', (socket) => {
  console.log('New Client connected!! ', socket.id);
  // eventPool.forEach((e) => {
  //   console.log(e, payload);
  // });

  // join a room
  socket.on('join', (payload) => {
    socket.join(payload.room);
    console.log(`${socket.id} joined room: ${payload.room}`);
    console.log(payload.message);
    socket.to(payload.room).emit('ride-accepted', payload);
  });

  socket.on('ride-request', (payload) => {
    console.log(socket.id);
    payload.room = socket.id;
    console.log(':: : event occurred : ride requested', payload);
    socket.broadcast.emit('ride-request', payload);
  });

  socket.on('arrival-at-rider', (payload) => {
    socket.to(payload.room).emit('arrival-at-rider', payload);
  });
  socket.on('picked-up', (payload) => {
    console.log(
      `${payload.customerName} has been picked up and is in transit to their destination`
    );
  });
  socket.on('dropped-off', (payload) => {
    console.log(
      `${payload.customerName} has arrived at destination and has been dropped off`
    );
  });

  // socket.emit()
  // emitting a notification to a room
  // socket.broadcast.emit('ride-accepted', payload);
  // console.log(':: : event occurred : ride accepted', payload);
  // socket.to(payload.clientId).emit('transit-to-rider', payload);
  // console.log(':: : event occurred : driver on the way', payload);
  // socket.to(payload.clientId).emit('arrival', payload);
  // console.log(':: : event occurred : driver arrived', payload);
  // socket.to(payload.clientId).emit('picked-up', payload);
  // console.log(
  //   ':: : event occurred : driver has picked up the rider',
  //   payload
  // );
  // socket.to(payload.clientId).emit('transit-to-destination', payload);
  // console.log(
  //   ':: : event occurred : driver in transit to destination',
  //   payload
  // );
  // socket.to(payload.clientId).emit('destination-arrival', payload);
  // console.log(':: : event occurred : driver arrived to destination', payload);
  // socket.to(payload.clientId).emit('dropped-off', payload);
  // console.log(
  //   ':: : event occurred : driver has dropped-off the rider',
  //   payload
  // );

  // socket.on('in-transit', (payload) => {
  //   console.log('EVENT OCCURRED :', 'in-transit', payload);
  //   // emitting a notification to a room
  //   socket.to(payload.clientId).emit('delivered', payload);
  // });

  // socket.on('delivered', (payload) => {
  //   console.log('EVENT OCCURRED :', 'delivered', payload);
  //   // emitting a notification to a room
  //   socket.to(payload.clientId).emit('delivered', payload);
  // });
});
