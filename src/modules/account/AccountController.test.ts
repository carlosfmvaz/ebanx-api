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

    beforeEach(async () => {
        responseMock.status.mockClear();
        responseMock.json.mockClear();
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

    it('should withdraw from existing account', async () => {
        const requestMock = {
            body: {
                type: "withdraw",
                origin: "100",
                amount: 5
            }
        }
        await accountController.handleEvent(requestMock, responseMock);
        expect(responseMock.status).toBeCalledWith(201);
        expect(responseMock.json).toHaveBeenCalledWith({
            origin: {
                id: "100",
                balance: 15
            }
        });
    });

    it('should transfer from existing account', async () => {
        const requestMock = {
            body: {
                type: "transfer",
                origin: "100",
                amount: 15,
                destination: "300"
            }
        }
        await accountController.handleEvent(requestMock, responseMock);
        expect(responseMock.status).toBeCalledWith(201);
        expect(responseMock.json).toHaveBeenCalledWith({
            origin: {
                id: "100",
                balance: 0
            },
            destination: {
                id: "300",
                balance: 15
            }
        });
    });
});