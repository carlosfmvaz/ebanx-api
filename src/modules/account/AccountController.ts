import { NextFunction, Request, Response } from "express";
import ApiError from "../../helpers/ApiError";

export default class AccountController {
    private accountService;

    constructor(accountService: any) {
        this.accountService = accountService;
    }

    async getBalance(req: Request, res: Response, next: NextFunction) {
        try {
            const { query } = req;
            if (!query.account_id) throw new ApiError("Account not found", 404);

            const balance = await this.accountService.getBalance(query.account_id);
            return res.status(200).json(balance);
        } catch (error: any) {
            next(error);
        }
    }

    async handleEvent(req: Request, res: Response, next: NextFunction) {
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
                throw new ApiError("Unknown event", 404);
            }
        } catch (error: any) {
            next(error);
        }
    }

    async restoreInitialState(req: Request, res: Response, next: NextFunction) {
        try {
            await this.accountService.restoreInitialState();
            return res.sendStatus(201);
        } catch (error: any) {
            next(error);
        }
    }
}