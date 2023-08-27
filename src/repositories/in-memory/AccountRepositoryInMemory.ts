import { isOmittedExpression } from "typescript";
import IAccountRepository from "../IAccountRepository";
import Account from "../../modules/account/entities/Account";

export default class AccountRepositoryInMemory implements IAccountRepository{
    private accountList: Array<any>;

    constructor() {
        this.accountList = [];
    }

    async get(id: number): Promise<false | Account> {
        const accountResult = this.accountList.find((acc) => acc.id == id);
        if (!accountResult) return false;
        
        const builder = {
            id: accountResult.id,
            balance: accountResult.balance, 
        };
        return Account.restore(builder);
    }

    async save(account: Account): Promise<Account> {
        this.accountList.push(account);
        return account;
    }
}