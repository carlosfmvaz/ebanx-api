import AccountRepositoryJson from "../../repositories/json/AccountRepositoryJson";
import AccountService from "./AccountService";
import AccountController from "./AccountController";
import ApiError from "../../helpers/ApiError";

describe('AccountController test suite', () => {
    let accountController: any;
    let responseMock: any;
    let nextMock: any;

    beforeAll(async () => {
        nextMock = jest.fn();
        responseMock = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(() => responseMock),
        };
        
        const accountRepositoryJson = new AccountRepositoryJson();
        const accountService = new AccountService(accountRepositoryJson);
        accountController = new AccountController(accountService);

        // reset state
        await accountController.restoreInitialState({}, {}, nextMock);
    });

    beforeEach(async () => {
        responseMock.status.mockClear();
        responseMock.json.mockClear();
        nextMock.mockClear();
    });

    afterAll(async () => {
        await accountController.restoreInitialState({}, {}, nextMock);
    })

    it('should get balance from non existing account', async () => {
        const requestMock = {
            query: {
                account_id: "800"
            }
        }
        await accountController.getBalance(requestMock, responseMock, nextMock);
        expect(nextMock).toBeCalledWith(new ApiError("Account not found", 404));
    });

    it('should create account with initial balance', async () => {
        const requestMock = {
            body: {
                type: "deposit",
                destination: "100",
                amount: 10
            }
        }
        await accountController.handleEvent(requestMock, responseMock, nextMock);
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
        await accountController.handleEvent(requestMock, responseMock, nextMock);
        expect(responseMock.status).toBeCalledWith(201);
        expect(responseMock.json).toHaveBeenCalledWith({
            destination: {
                id: "100",
                balance: 20
            }
        });
    });

    it('should get balance from existing account', async () => {
        const requestMock = {
            query: {
                account_id: "100"
            }
        }
        await accountController.getBalance(requestMock, responseMock, nextMock);
        expect(responseMock.status).toBeCalledWith(200);
        expect(responseMock.json).toHaveBeenCalledWith({
            balance: 20
        });
    });

    it('should withdraw from non-existing account', async () => {
        const requestMock = {
            body: {
                type: "withdraw",
                origin: "200",
                amount: 10
            }
        }
        await accountController.handleEvent(requestMock, responseMock, nextMock);
        expect(nextMock).toBeCalledWith(new ApiError("Account not found", 404));
    });

    it('should withdraw from existing account', async () => {
        const requestMock = {
            body: {
                type: "withdraw",
                origin: "100",
                amount: 5
            }
        }
        await accountController.handleEvent(requestMock, responseMock, nextMock);
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
        await accountController.handleEvent(requestMock, responseMock, nextMock);
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