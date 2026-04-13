import axios from 'axios';
import { User } from '../src/user';
import { Application } from '../src/application';
import { Data } from '../src/data';

const port = 3000;
const baseURL = `http://localhost:${port}`;
let server: any;

// None of this is implemented yet, tests may have to change to conform to actual implementation.
describe("Integration tests for API", () => {
    beforeAll((done) => {
        server = server.start(port, done);
    });

    afterAll((done) => {
        server.close(done);
    });

    // Integration test between API and getUsers method in Data class.
    it("should return an empty array of users", async () => {
        const response = await axios.get(`${baseURL}/users`);
        expect(response.status).toBe(200);
        expect(response.data).toEqual([]);
    });

    // Integration test between API and addUser method in Data class.
    it("should create a new user", async () => {
        const newUser = { username: "testuser", email: "test@example.com", userId: 1 };
        const response = await axios.post(`${baseURL}/users`, newUser);
        expect(response.status).toBe(201);
        expect(response.data.username).toBe(newUser.username);
        expect(response.data.email).toBe(newUser.email);
    });

    // Integration test between API and getUsers method in Data class.
    it("should return a user", async () => {
        const newUser = { username: "testuser", email: "test@example.com", userId: 1 };
        await axios.post(`${baseURL}/users`, newUser);
        const response = await axios.get(`${baseURL}/users`);
        expect(response.status).toBe(200);
        expect(response.data).toEqual([newUser]);
    });

    // Integration test between API and addUser method in Data class.
    it("should return an error for already existing user", async () => {
        const newUser = { username: "testuser", email: "test@example.com", userId: 1 };
        try {
            await axios.post(`${baseURL}/users`, newUser);
        } catch (error: any) {
            expect(error.response.status).toBe(400);
            expect(error.response.data).toBe("User with this ID already exists.");
        }
    });
});


describe ("White Box Tests", () => {
    // This provides branch coverage of the addUser method in the Data class.
    test("Test adding Users to Database", () => {
        const data = new Data();
        const user1 = data.addUser(1, "testuser1", "test1@example.com");
        if (!user1) throw new Error("Failed to add user1");
        expect(user1.getUserId()).toBe(1);
        expect(user1.getUsername()).toBe("testuser1");
        expect(user1.getEmail()).toBe("test1@example.com");
        const repeatUser1 = data.addUser(1, "testuser1", "test1@example.com");
        expect(repeatUser1).toBeUndefined();
    });

    // This provides branch coverage of the addApplication method in the Data class.
    test("Test adding Applications to Database", () => {
        const data = new Data();
        const app1 = data.addApplication(1, "testapp1", "This is a test application.");
        if (!app1) throw new Error("Failed to add app1");
        expect(app1.getId()).toBe(1);
        expect(app1.getName()).toBe("testapp1");
        expect(app1.getDescription()).toBe("This is a test application.");
        const repeatApp1 = data.addApplication(1, "testapp1", "This is a test application.");
        expect(repeatApp1).toBeUndefined();
    });
});

// Black box tests
describe ("Black Box Tests", () => {
    test("Test deleting User from Database", () => {
        const data = new Data();
        data.addUser(1, "testuser1", "test1@example.com");
        data.addUser(2, "testuser2", "test2@example.com");
        const result1 = data.removeUser(1);
        expect(result1).toBe(true);
        const result2 = data.removeUser(1);
        expect(result2).toBe(false);
        const result3 = data.removeUser(3);
        expect(result3).toBe(false);
    });

    test("Test deleting Application from Database", () => {
        const data = new Data();
        data.addApplication(1, "testapp1", "This is a test application.");
        data.addApplication(2, "testapp2", "This is another test application.");
        const result1 = data.removeApplication(1);
        expect(result1).toBe(true);
        const result2 = data.removeApplication(1);
        expect(result2).toBe(false);
        const result3 = data.removeApplication(3);
        expect(result3).toBe(false);
    });

    test("Adding review to application", () => {
        const data = new Data();
        data.addApplication(1, "testapp1", "This is a test application.");
        data.addUser(1, "testuser1", "test1@example.com");
        data.getApplicationById(1)?.addReview("Great app!", 1);
        const reviews = data.getApplicationById(1)?.getReviews();
        expect(reviews?.length).toBe(1);
        expect(reviews?.[0].getUserId()).toBe(1);
        expect(reviews?.[0].getComment()).toBe("Great app!");
    });
});