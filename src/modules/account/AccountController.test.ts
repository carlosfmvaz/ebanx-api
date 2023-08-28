import axios from "axios";
import AccountRepositoryJson from "../../repositories/json/AccountRepositoryJson";
import AccountService from "./AccountService";
import AccountController from "./AccountController";

describe('AccountController test suite', () => {
    let accountController: any;
    let responseMock: any;

    beforeAll(async () => {
        const accountRepositoryJson = new AccountRepositoryJson();
        const accountService = new AccountService(accountRepositoryJson);
        accountController = new AccountController(accountService);

        // reset state
        await accountController.restoreInitialState({}, {});

        responseMock = {
            status: jest.fn(() => responseMock),
            json: jest.fn(() => responseMock),
        };
    });

    afterAll(async () => {
        await accountController.restoreInitialState({}, {});
    })

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
                id: "100",
                balance: 10
            }
        });
    });

    it('should deposit into existing account', async () => {
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
                id: "100",
                balance: 20
            }
        });
    });
});