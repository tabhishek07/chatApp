import socketIO from 'socket.io-client';

let socketInstance = null;

export const initializeSocket = (projectId) => {

    socketInstance = socketIO(import.meta.env.VITE_API_URL, {
        auth: {
            token: localStorage.getItem('token')
        },
        query: {
            projectId
        }
    });

    return socketInstance;
}

export const receiveMessage = (eventname, cb) => {
    socketInstance.on(eventname, cb);

}

export const sendMessage = (eventname, data) => {
    socketInstance.emit(eventname, data);
}