import { WebSocketServer } from 'ws';

const port = 3000;

const wss = new WebSocketServer({ port });

wss.on('connection', function connection(ws) {
    console.log('Client connected');
    ws.on('error', console.error);

    // isBinary -> en el caso que se envie data/binarios/strings/etc. 
    ws.on('message', function message(data, isBinary) {
        console.log('received: %s', data);
        // TODO: send data to all clients
        const payload = {
            data: data.toString().toUpperCase(),
            timestamp: new Date().toISOString()
        }

        ws.send(JSON.stringify(payload));
        ws.send(data.toString().toUpperCase());
    });

    ws.on('close', function close() {
        console.log('Client disconnected');
    });
});

console.log(`Server running on port ${port}`);