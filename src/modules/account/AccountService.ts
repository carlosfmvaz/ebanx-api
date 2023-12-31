import ApiError from "../../helpers/ApiError";
import IAccountRepository from "../../repositories/IAccountRepository";
import DepositDTO from "./dto/DepositDTO";
import TransferDTO from "./dto/TransferDTO";
import WithdrawDTO from "./dto/WithdrawDTO";
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
            return await this.accountRepository.update(account);
        } else {
            const accountToCreate = Account.create(depositInfo.destination, depositInfo.amount);
            return this.accountRepository.save(accountToCreate);
        }
    }

    async handleWithdraw(withdrawInfo: WithdrawDTO) {
        const account = await this.accountRepository.get(withdrawInfo.origin);
        if (account) {
            account.withdraw(withdrawInfo.amount);
            return await this.accountRepository.update(account);
        } else {
            throw new ApiError("Account not found", 404);
        }
    }

    async handleTransfer(transferInfo: TransferDTO) {
        let originAccount = await this.accountRepository.get(transferInfo.origin);
        let destinationAccount = await this.accountRepository.get(transferInfo.destination);

        if (!originAccount) throw new ApiError("Origin account not found", 404);

        if (!destinationAccount) {
            destinationAccount = Account.create(transferInfo.destination, 0);
        } 
        originAccount.withdraw(transferInfo.amount);
        destinationAccount.deposit(transferInfo.amount);
        
        const updatedOriginAccount = await this.accountRepository.update(originAccount);
        const updatedDestinationAccount = await this.accountRepository.update(destinationAccount);
        
        return { origin: updatedOriginAccount, destination: updatedDestinationAccount };
    }

    async getBalance(accountId: number) {
        const account = await this.accountRepository.get(accountId);
        if (account) {
            return account.balance;
        } else {
            throw new ApiError("Account not found", 404);
        }
    }

    async restoreInitialState() {
        await this.accountRepository.restoreInitialState();
    }
}