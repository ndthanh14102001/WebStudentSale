import { io } from "socket.io-client";
// const SERVER_URL = "http://localhost:3000";
const SERVER_URL = "http://35.240.158.158";
const socket = io(SERVER_URL, {
  autoConnect: false
});

//  wait until socket connects before adding event listeners
// socket.on("connect", () => {
//   console.log(socket.connected); // true
// });

socket.auth = {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjgxNjExMzIwLCJleHAiOjE2ODQyMDMzMjB9.5LMxZGOreNxty3vJwuSE_3ZDuVrfQH4qs1uAFvFwwUM"}

socket.connect();

 socket.on("private message", (message) => {
    console.log(message)
 })

 socket.on("notification", (notification) => {
  console.log(notification)
})

socket.on("disconnect", () => {
  console.log(socket.connected); // false
});
