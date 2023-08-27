import IAccountRepository from "../../repositories/IAccountRepository";
import DepositDTO from "./dto/DepositDTO";
import Account from "./entities/Account";

export default class AccountService {
    private accountRepository: IAccountRepository;

    constructor(accountRepository: IAccountRepository) {
        this.accountRepository = accountRepository;
    }

    async handleDeposit(depositInfo: DepositDTO) {
        const account = await this.accountRepository.get(depositInfo.destination);
        if (account) {
            account.deposit(depositInfo.amount);
            return await this.accountRepository.save(account);
        } else {
            const accountToCreate = Account.create(depositInfo.destination, depositInfo.amount);
            return this.accountRepository.save(accountToCreate);           
        }
    }
}