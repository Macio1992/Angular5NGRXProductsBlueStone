#!/usr/bin/env node

let app = require('../backend/app');
let http = require('http');
let config = require('../backend/config/config');

let port = config.dev.port;

let server = http.createServer(app);

server.listen(port, () => {
    console.log('app is on localhost:' + port);
});