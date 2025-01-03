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

// Elysia App
const app = new Elysia();

// Routes automatically initialized through autoroutes
app.use(autoroutes({
    routesDir: __dirname+"/routes",
    prefix: "/api"
}));

// Server Initialization
app.listen(3000, (server) => {
    console.log(`🦊 Elysia is running at ${server.hostname}:${server.port}`);
});

// Exports
export type ElysiaApp = typeof app;