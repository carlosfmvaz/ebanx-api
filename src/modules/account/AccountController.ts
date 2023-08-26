import { Request, Response } from "express";
import AccountService from "./AccountService";

export default class AccountController {
    private accountService: AccountService;
    
    constructor(accountService: AccountService) {
        this.accountService = accountService;
    }

    async getBalance(req: Request, res: Response) {
        throw new Error("Not implemented");
    }

    async handleDeposit(req: Request, res: Response) {
        res.sendStatus(200);
    }
}