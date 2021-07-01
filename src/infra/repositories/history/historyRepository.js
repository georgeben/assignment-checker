import { pick } from "lodash";

class HistoryRepository {
  constructor({ mongoModels }) {
    const { History } = mongoModels;
    this.History = History;
  }

  async save(payload) {
    const data = pick(payload, [
      "firstStudent",
      "secondStudent",
      "similarity",
      "matches",
    ]);
    const history = new this.History(data);
    return history.save();
  }

  async getAll() {
    return this.History.find().lean();
  }
}

export default HistoryRepository;
