// Import Express
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { getAuth } from 'firebase-admin/auth';
import http from 'http';
import mongoose from 'mongoose';
import './firebaseConfig.js';
import { resolvers } from './resolvers/index.js';
import { typeDefs } from './schemas/index.js';

const app = express(); // Use Express framework
const httpServer = http.createServer(app);

const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yfhpdwg.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 1210;

// ApolloServer configuration
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

const authorizationJWT = async (req, res, next) => {
    console.log({ authorization: req.headers.authorization }); // Debug
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader) {
        const accessToken = authorizationHeader.split(' ')[1]; // Remove the 'Bearer' out of the string. 

        getAuth()
            .verifyIdToken(accessToken)
            .then((decodedToken) => {
                console.log({ decodedToken });
                res.locals.uid = decodedToken.uid;
                next();
            })
            .catch((err) => {
                console.log({ err });
                return res
                    .status(403)
                    .json({ message: 'Forbidden', error: err });
            });
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
};

app.use(
    cors(),
    authorizationJWT,
    bodyParser.json(),
    expressMiddleware(server, {
        context: async ({ req, res }) => {
            return { uid: res.locals.uid };
        },
    })
);

mongoose.set('strictQuery', false);
mongoose
    .connect(URI, {
        useNewUrlParser: true,
    })
    .then(async () => {
        console.log('Connected to database!');
        await new Promise((resolve) =>
            httpServer.listen({ port: PORT }, resolve)
        );
        console.log(`Server is ready at port ${PORT}`);
    });
