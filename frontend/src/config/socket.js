import socketIO from 'socket.io-client';

let socketInstance = null;

export const initializeSocket = () => {

    socketInstance = socketIO(import.meta.env.VITE_API_URL, {
        auth: {
            token: localStorage.getItem('token')
        }
    });

    return socketInstance;
}