'use strict';

const Hapi = require('hapi');
const fs = require('fs');

let quotes = [{
    author: 'Test Author',
    text: 'Some test quote'
}];

(async () => {
    // Create a server with a host and port
    const server = Hapi.server({
        host: 'localhost',
        port: 8888,
        "routes": {
            "cors": {
                origin: ["*"],
                headers: ["Accept", "Content-Type"],
                additionalHeaders: ["X-Requested-With"]
            }
        }
    });

    // Add the route
    server.route({
        method: 'POST',
        path: '/quotes',
        handler: async (req) => {
            quotes.push(req.payload);
            return quotes;
        }
    });

    server.route({
        method: 'GET',
        path: '/quotes',
        handler: async (req) => {
            return quotes;
        }
    });

    server.route({
        method: 'GET',
        path: '/reset',
        handler: async (req) => {
            quotes = [{
                author: 'Test Author',
                text: 'Some test quote'
            }];

            return quotes;
        }
    });

    // Start the server
    const start = async function () {
        try {
            await server.start();
        } catch (err) {
            console.log(err);
            process.exit(1);
        }

        console.log('Server running at:', server.info.uri);
    };

    start();
})();
