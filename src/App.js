/**
 * Manages application interfaces e.g REST server, gRPC server
 */
class App {
  constructor({ httpServer, log }) {
    this.httpServer = httpServer;
    this.log = log;
  }

  /**
   * Starts the application interfaces to begin handling user requests
   */
  start() {
    this.httpServer.start();
  }

  /**
   * Closes the application's interfaces
   */
  shutdown() {
    this.httpServer.close((err) => {
      this.log("Shutting down server");
      if (err) {
        this.log("Error while shutting down server", err);
      }
      process.exit(err ? 1 : 0);
    });
  }
}

export default App;
