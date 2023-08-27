import DepositDTO from "./dto/DepositDTO";

export default class AccountService {
    async deposit(depositInfo: DepositDTO) {
        return depositInfo;
    }
}