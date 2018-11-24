"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = {
    collections: {
        users: {
            collection: "users"
        },
        products: {
            collection: "prodcuts"
        }
    },
    databaseUrl: "mongodb://127.0.0.1:27017/database",
    serverPort: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    hash: {
        salt: "saltystring",
        rounds: 10
    }
};
