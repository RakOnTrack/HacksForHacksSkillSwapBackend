/**
 * 
 * SkillSwap Backend API
 * 
 * File: index.ts
 * Description: Main initialization file for the API Server
 * 
 * @author mvvrgan
 * @version 03/01/2025
 * 
 */

// Imports
import { Elysia } from "elysia";
import { autoroutes } from "elysia-autoroutes";
import { connect } from "mongoose";
import * as user from "./models/user";

// Elysia App
const app = new Elysia();

// Routes automatically initialized through autoroutes
app.use(autoroutes({
    routesDir: __dirname+"/routes",
    prefix: "/api"
}));

// Database Connection
if (!Bun.env.MONGO_URI) throw new Error("💾 Database Connection Error: No URI Provided");
connect(Bun.env.MONGO_URI).then(() => {
    console.log("💾 Database Connection Established");
}).catch((err) => {
    console.error("💾 Database Connection Error: ", err);
});

// Server Initialization
app.listen(3000, (server) => {
    console.log(`🦊 Elysia is running at ${server.hostname}:${server.port}`);
});

// Exports
export type ElysiaApp = typeof app;