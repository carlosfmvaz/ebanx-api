import fs from 'fs/promises';
import IAccountRepository from "../IAccountRepository";
import Account from "../../modules/account/entities/Account";
import path from 'path';

export default class AccountRepositoryJson implements IAccountRepository {
    async get(id: number): Promise<false | Account> {
        const filePath = path.join(__dirname, '..', '..', 'data/dummyData.json');
        const rawData = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(rawData);
        const accountResult = data.find((acc: any) => acc.id === id);
        if (!accountResult) return false;

        const builder = {
            id: accountResult.id,
            balance: accountResult.balance,
        };
        return Account.restore(builder);
    }

    async save(account: Account): Promise<Account> {
        const filePath = path.join(__dirname, '..', '..', 'data/dummyData.json');
        const rawData = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(rawData);
        data.push({
            id: account.id,
            balance: account.balance
        });
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        return account;
    }

    async update(account: Account): Promise<Account> {
        const filePath = path.join(__dirname, '..', '..', 'data/dummyData.json');
        const rawData = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(rawData);

        const accountIndex = data.findIndex((acc: any) => acc.id === account.id);
        data[accountIndex] = {
            id: account.id,
            balance: account.balance
        };
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        return account;
    }

    async restoreInitialState(): Promise<void> {
        await fs.copyFile('initialDummyData.json', 'dummyData.json');
    }
}