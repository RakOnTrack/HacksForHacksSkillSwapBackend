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
import type { ElysiaApp } from "../../../index";
import { t } from "elysia";
import { getUser } from "../../../models/user";

/**
 * API Route
 * @param app ElysiaApp
 */
export default (app: ElysiaApp) => {
    return app

    .get("/", async ({ set, params }) => {
        return getUser(params.id).then((user) => {
            set.headers = {
                "Content-Type": "application/json"
            };
            set.status = 200;
            return user;
        }).catch((err) => {
            set.status = 404;
            return {
                statusCode: set.status,
                message: "User not found"
            };
        });
    }, {
        params: t.Object({
            id: t.String()
        })
    })
};