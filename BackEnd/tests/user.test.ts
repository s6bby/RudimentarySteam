import { User } from "../src/user";
import { Application } from "../src/application";
import { Review } from "../src/review";
import { Data } from "../src/data";

describe ("User Tests", () => {
    test("Create User", () => {
        const user = new User(1, "testuser", "testuser@example.com");
        expect(user.getUserId()).toBe(1);
        expect(user.getUsername()).toBe("testuser");
        expect(user.getEmail()).toBe("testuser@example.com");
    });
    test("Update User Email", () => {
        const user = new User(1, "testuser", "testuser@example.com");
        user.updateEmail("newemail@example.com");
        expect(user.getEmail()).toBe("newemail@example.com");
    });
});

describe ("Application Tests", () => {
    
});

describe ("Review Tests", () => {

});

describe ("Data Tests", () => {

});
