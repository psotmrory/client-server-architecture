const http = require('http');
const fs = require('fs');
const path = require('path');

let requestCount = 0;

const server = http.createServer((req, res) => {  
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        return res.end();
    }
    requestCount++; 

    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

    if (req.method === 'GET' && req.url === '/') {
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Internal Server Error');
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.method === 'POST' && req.url === '/data') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            if (!body) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'No data provided' }));
            }

            try {
                const data = JSON.parse(body);
                console.log('Received data:', data);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Data received', data }));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    } else if (req.method === 'GET' && req.url === '/status') {
        const status = {
            serverTime: new Date().toISOString(),
            requestCount,
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(status));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');  // Changed to 'http' instead of 'https'
});
