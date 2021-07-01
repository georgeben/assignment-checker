import UseCase from "../../UseCase";

class CompareHistory extends UseCase {
  constructor({ historyRepository }) {
    super();
    this.historyRepository = historyRepository;
  }

  execute() {
    return this.historyRepository.getAll();
  }
}

export default CompareHistory;
