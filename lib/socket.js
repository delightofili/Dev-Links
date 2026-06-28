import { io } from "socket.io-client";

let socket;

export function getSocket(accessToken) {
  if (!socket) {
    socket = io("http://localhost:5000", {
      auth: {
        token: accessToken,
      },
      autoConnect: true,
    });
  }
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
