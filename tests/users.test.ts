import { expect, test } from "bun:test";
import * as user from "../src/models/user";

test("Create User", () => {
    user.createUser({
        name: "John Doe",
        email: "johndoe01@gmail.com",
    }).then((res) => {
        expect(res).toHaveProperty("name");
        expect(res).toHaveProperty("email");
    });
});

test("Get Users", () => {
    user.getUsers().then((res) => {
        expect(res).toBeInstanceOf(Array);
    });
});