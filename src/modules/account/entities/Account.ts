export default class Account {
    id?: number;
    balance: number;

    private constructor() {
        this.balance = 0;
    }

    static create(id: number, balance: number) {
        const account = new Account();
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
        if (amount <= 0) throw new Error("The amount cannot be negative or zero");
        this.balance += amount;
    }

    withdraw(amount: number) {
        if (amount <= 0) throw new Error("The amount cannot be negative or zero");
        if (this.balance < amount) throw new Error("Insufficient funds");
        
        this.balance -= amount;
    }
}