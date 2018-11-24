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
    databaseUrl: "mongodb://127.0.0.1/db",
    serverPort: process.env.PORT ? parseInt(process.env.PORT) : 3000
};
