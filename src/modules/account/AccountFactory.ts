import AccountController from "./AccountController";
import AccountService from "./AccountService";

export default function accountFactory() {
    const accountService = new AccountService();
    const accountController = new AccountController(accountService);
    return accountController;
}