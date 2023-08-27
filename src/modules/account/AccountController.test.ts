import axios from "axios";

describe('AccountController test suite', () => {
    it('should create account with initial balance', async () => {
        const response = await axios.post('http://localhost:8080/event', {
            type: "deposit",
            destination: "100",
            amount: 10
        });

        expect(response.status).toBe(201);
        expect(response.data).toEqual({
            destination: {
                id: "100",
                balance: 10
            }
        });
    });
});