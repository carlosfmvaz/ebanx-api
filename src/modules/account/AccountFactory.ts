import AccountRepositoryJson from "../../repositories/json/AccountRepositoryJson";
import AccountController from "./AccountController";
import AccountService from "./AccountService";

export default function accountFactory() 
{
    const accountRepositoryJson = new AccountRepositoryJson(); 

    const accountService = new AccountService(accountRepositoryJson);
    const accountController = new AccountController(accountService);
    return accountController;
}