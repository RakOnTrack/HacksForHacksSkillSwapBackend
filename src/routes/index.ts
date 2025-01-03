/**
 * 
 * SkillSwap Backend API
 * 
 * File: index.ts
 * Description: Endpoint, route for API
 * 
 * @author mvvrgan
 * @version 03/01/2025
 */

// Imports
import type { ElysiaApp } from "../index";

/**
 * API Route
 * @param app ElysiaApp
 */
export default (app: ElysiaApp) => {
    return app.get("/", ({ set }) => {     

        set.status = 200;
        return {
            statusCode: set.status,
            message: "API is Online"
        };
    });
};