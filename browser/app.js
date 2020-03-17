import whiteboard from "./whiteboard";
import io from "socket.io-client"
const socket = io(window.location.origin);

socket.on('connect', function () {
  console.log('Connected!');
});

socket.on('load', function (strokes) {

  strokes.forEach(function (stroke) {
    const start = stroke.start;
    const end = stroke.end;
    const color = stroke.color;
    whiteboard.draw(start, end, color, false);
  });

});

socket.on('draw', function (start, end, color) {
  whiteboard.draw(start, end, color, false);
});

whiteboard.on('draw', function (start, end, color) {
  socket.emit('draw', start, end, color);
});

export default socket
