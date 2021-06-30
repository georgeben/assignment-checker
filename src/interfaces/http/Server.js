import express from "express";
import http from "http";
import helmet from "helmet";

/**
 * Creates and configures an HTTP server
 */
class HttpServer {
  constructor({ config, routes, log }) {
    const app = express();
    app.disable("x-powered-by");
    app.use(helmet());
    app.use(routes);
    this.app = http.createServer(app);
    this.config = config;
    this.log = log;
  }

  start() {
    const port = this.config.get("app.httpPort");
    const serviceName = this.config.get("app.serviceName");
    const serviceVersion = this.config.get("app.serviceVersion");
    return this.app.listen(port, () => {
      this.log(`REST server for ${serviceName} v${serviceVersion} listening on port ${port}`);
    });
  }

  close(cb) {
    return this.app.close(cb);
  }
}

export default HttpServer;
