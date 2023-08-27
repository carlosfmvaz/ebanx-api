import { Request, Response } from "express";
import AccountService from "./AccountService";

export default class AccountController {
    private accountService;

    constructor(accountService: any) {
        this.accountService = accountService;
    }

    async getBalance(req: Request, res: Response) {
        throw new Error("Not implemented");
    }

    async handleEvent(req: Request, res: Response) {
        try {
            const { body } = req;
            if (body.type == 'deposit') {
                const depositInfo = {
                    type: body.type,
                    destination: body.destination,
                    amount: body.amount,
                };
                const deposit = await this.accountService.deposit(depositInfo);
                return res.status(201).json(deposit);
            } else if (body.type == 'withdraw') {

            } else if (body.type == 'transfer') {

            } else {
                throw new Error("Unknown event");
            }
        } catch (error) {

        }
    }
}