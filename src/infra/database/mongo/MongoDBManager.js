import mongoose from "mongoose";
import config from "config";
import log from "infra/logger";

/**
 * Manages connection to MongoDB
 */
class MongoDBManager {
  constructor() {
    const user = encodeURIComponent(config.get("db.mongodb.user"));
    const password = encodeURIComponent(config.get("db.mongodb.password"));
    const host = config.get("db.mongodb.host");
    const name = config.get("db.mongodb.name");
    const auth = config.get("db.mongodb.auth");

    let connectionString = `mongodb://${host}/${name}`;
    if (auth) {
      connectionString = `mongodb+srv://${user}:${password}@${host}/${name}?retryWrites=true&w=majority`;
    }

    this.connectionString = connectionString;
    this.connection = mongoose.connection;
    this.connection.on("open", () => log("Successfully connected to MongoDB"));
    this.connection.on("disconnected", () => log("Disconnected from MongoDB"));
    this.connection.on("error", (error) => log("Error while connecting to MongoDB", error));
  }

  /**
   * Connects to MongoDB
   * @param {number} poolSize - Connection pool size
   * @param {boolean} autoIndex - Use autoIndex
   * @param {number} numOfRetries - Number of connection attempts
   */
  async connect(poolSize = 10, autoIndex = true, numOfRetries = 3) {
    log(`Attempting to connect to MongoDB. Retries left: ${numOfRetries}`);
    try {
      await mongoose.connect(this.connectionString, {
        poolSize,
        autoIndex,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      });
    } catch (error) {
      log("Failed to connected to MongoDB", error);
      if (numOfRetries <= 0) {
        log("Exhausted max number of retries for connecting to MongoDB");
        process.exit(1);
      }
      setTimeout(() => {
        this.connect(poolSize, autoIndex, numOfRetries - 1);
      }, 1000);
    }
  }
}

export default MongoDBManager;
