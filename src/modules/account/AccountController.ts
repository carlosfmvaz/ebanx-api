import { Request, Response } from "express";
import AccountService from "./AccountService";

export default class AccountController {
    private accountService;

    constructor(accountService: any) {
        this.accountService = accountService;
    }

    async getBalance(req: Request, res: Response) {
        try {
            const { params } = req;
            if (!params.account_id) throw new Error("Account not found");
            
            const balance = await this.accountService.getBalance(params.account_id);
            return res.status(200).json({ balance });
        } catch (error) {
            
        }
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
                const deposit = await this.accountService.handleDeposit(depositInfo);
                return res.status(201).json({ destination: deposit });
            } else if (body.type == 'withdraw') {
                const withdrawInfo = {
                    type: body.type,
                    origin: body.origin,
                    amount: body.amount,
                };
                const withdraw = await this.accountService.handleWithdraw(withdrawInfo);
                return res.status(201).json({ origin: withdraw });
            } else if (body.type == 'transfer') {
                const transferInfo = {
                    type: body.type,
                    origin: body.origin,
                    destination: body.destination,
                    amount: body.amount,
                };
                const transfer = await this.accountService.handleTransfer(transferInfo);
                return res.status(201).json({ origin: transfer.origin, destination: transfer.destination });
            } else {
                throw new Error("Unknown event");
            }
        } catch (error) {

        }
    }

    async restoreInitialState(req: Request, res: Response) {
        try {
            await this.accountService.restoreInitialState();
            return res.sendStatus(201);
        } catch (error) {
            
        }
    }
}