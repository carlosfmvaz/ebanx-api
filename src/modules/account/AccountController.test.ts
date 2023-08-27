import axios from "axios";
import AccountRepositoryInMemory from "../../repositories/in-memory/AccountRepositoryInMemory";
import AccountService from "./AccountService";
import AccountController from "./AccountController";

describe('AccountController test suite', () => {
    let accountController: any;
    let responseMock: any;

    beforeEach(() => {
        const accountRepositoryInMemory = new AccountRepositoryInMemory();
        const accountService = new AccountService(accountRepositoryInMemory);
        accountController = new AccountController(accountService);

        responseMock = {
            status: jest.fn(() => responseMock),
            json: jest.fn(() => responseMock),
        };
    });

    it('should create account with initial balance', async () => {
        const requestMock = {
            body: {
                type: "deposit",
                destination: "100",
                amount: 10
            }
        }
        await accountController.handleEvent(requestMock, responseMock);
        expect(responseMock.status).toBeCalledWith(201);
        expect(responseMock.json).toHaveBeenCalledWith({
            destination: {
                id: 100,
                balance: 30
            }
        });
    });
});