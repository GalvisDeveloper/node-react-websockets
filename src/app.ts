import WebSocket, { WebSocketServer } from 'ws';

const port = 3000;

const wss = new WebSocketServer({ port });

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    // isBinary -> en el caso que se envie data/binarios/strings/etc. 
    ws.on('message', function message(data, isBinary) {
        console.log('received: %s', data);
        const payload = JSON.stringify({
            data: data.toString().toUpperCase(),
            timestamp: new Date().toISOString()
        });

        // including itself
        // wss.clients.forEach(function each(client) {
        //     if (client.readyState === WebSocket.OPEN) {
        //         client.send(payload, { binary: isBinary });
        //     }
        // });

        // excluding itself
        wss.clients.forEach(function each(client) {
            console.log({ sonIguales: client === ws });
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(payload, { binary: isBinary });
            }
        });
        // ws.send(JSON.stringify(payload));
        // ws.send(data.toString().toUpperCase());
    });

    ws.on('close', function close() {
        console.log('Client disconnected');
    });
});

console.log(`Server running on port ${port}`);