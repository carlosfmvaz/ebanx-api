import ApiError from "../../../helpers/ApiError";

export default class Account {
    id?: number;
    balance: number;

    private constructor() {
        this.balance = 0;
    }

    static create(id: number, balance: number) {
        const account = new Account();
        
        if (balance < 0) throw new ApiError("The initial balance cannot be negative or zero", 400);

        account.id = id;
        account.balance = balance;
        return account;
    }

    static restore(builder: any) {
        const account = new Account();
        account.id = builder.id;
        account.balance = builder.balance;
        return account;
    }

    deposit(amount: number) {
        if (amount <= 0) throw new ApiError("The amount cannot be negative or zero", 400);
        this.balance += amount;
    }

    withdraw(amount: number) {
        if (amount <= 0) throw new ApiError("The amount cannot be negative or zero", 400);
        if (this.balance < amount) throw new ApiError("Insufficient funds", 400);
        
        this.balance -= amount;
    }
}