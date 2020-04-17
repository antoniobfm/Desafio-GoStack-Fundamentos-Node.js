import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    // const isNumber = (valueNumber: number) =>
    //   !Number.isNaN(Number(valueNumber));
    // const transactionValue = isNumber(value);

    // // Se ja existir uma reserva ele retorna um erro
    // if (!transactionValue) {
    //   throw Error('string');
    // }

    if (type === 'outcome') {
      if (this.transactionsRepository.all().length === 0) {
        throw Error('string');
      }
      const balance = this.transactionsRepository.getBalance();
      if (balance.total <= value) {
        throw Error('string');
      }
    }

    // Cria o appointment atraves do repositorio
    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    // Retorna o appointment
    return transaction;
  }
}

export default CreateTransactionService;
