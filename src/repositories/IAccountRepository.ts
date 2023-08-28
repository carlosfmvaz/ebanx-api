import Account from "../modules/account/entities/Account";

export default interface IAccountRepository {
    save(account: Account): Promise<false | Account>;
    update(account: Account): Promise<false | Account>;
    get(id: number): Promise<false | Account>;
}