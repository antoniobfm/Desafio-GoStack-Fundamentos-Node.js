import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const getIncomeTeste = this.transactions
      .filter(elem => elem.type === 'income')
      .map(function (elem) {
        return elem.value;
      });

    const getOutcomeTeste = this.transactions
      .filter(elem => elem.type === 'outcome')
      .map(function (elem) {
        return elem.value;
      });
    const getIncome = getIncomeTeste.reduce(function (sum, elem: number) {
      return sum + elem;
    });

    if (getOutcomeTeste.length === 0) {
      const balance = {
        income: getIncome,
        outcome: 0,
        total: getIncome - 0,
      };

      return balance;
    }

    const getOutcome = getOutcomeTeste.reduce(function (sum, elem: number) {
      return sum + elem;
    });

    const balance = {
      income: getIncome,
      outcome: getOutcome,
      total: getIncome - getOutcome,
    };

    console.log(this.getBalance);
    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    // Cria um registro do model Transaction
    const transaction = new Transaction({ title, type, value });

    // Insere no banco de dados a reserva
    this.transactions.push(transaction);

    // Retorna a reserva criada
    return transaction;
  }
}

export default TransactionsRepository;
