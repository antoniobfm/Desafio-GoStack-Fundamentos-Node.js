import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response.json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // Captura as informacoes do body
    const { title, type, value } = request.body;

    // Define createAppointment chamanando o servico de criar o appointment
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    // Cria o appointment usando o servico e manda as variaveis
    const transaction = createTransaction.execute({
      title,
      type,
      value,
    });

    // Executa o codigo acima e retorna o JSON
    return response.json(transaction);

    // E se der errado...
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
