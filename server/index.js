const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const {
    ApolloServerPluginCacheControl,
} = require('@apollo/server/plugin/cacheControl');
const {
    ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');
require('dotenv').config();

const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const app = express();
const port = process.env.PORT || 3003;
const httpServer = http.createServer(app);

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginCacheControl({
                defaultMaxAge: 5,
                calculateHttpHeaders: false,
            }),
        ],
    });

    await server.start();

    app.use(
        '/',
        cors(),
        bodyParser.json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ token: req.headers.token }),
        }),
    );
};

startServer();

const startHttp = async () => {
    await new Promise((resolve) => httpServer.listen({ port }, resolve));

    console.log(`🚀 Server ready at http://localhost:${port}/`);
};

startHttp();
