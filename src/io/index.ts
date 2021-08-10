import { Server, Socket } from 'socket.io';

const io: Server = new Server({ 
    cors: { 
        origin: '*'
    }
});

io.use((client: Socket, next) => {
    if(client.handshake.query){
        if(typeof client.handshake.query.id == 'string'){
            client.userId = client.handshake.query.id;
            return next();
        }
        return client.disconnect(true);
    } else {
        return client.disconnect(true);
    }
});

io.on('connection', (client: Socket) => {
    client.on('disconnect', (reason: string) => {
        
    });
});