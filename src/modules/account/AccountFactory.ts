import AccountRepositoryInMemory from "../../repositories/in-memory/AccountRepositoryInMemory";
import AccountController from "./AccountController";
import AccountService from "./AccountService";

export default function accountFactory() 
{
    const accountRepositoryInMemory = new AccountRepositoryInMemory(); 

    const accountService = new AccountService(accountRepositoryInMemory);
    const accountController = new AccountController(accountService);
    return accountController;
}