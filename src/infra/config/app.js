const { version } = require("../../../package.json");

const config = {
  serviceName: {
    doc: "Service Name",
    format: "*",
    default: null,
    env: "SERVICE_NAME",
    sensitive: false,
  },
  serviceVersion: {
    doc: "Service version",
    format: "*",
    default: version,
    sensitive: false,
  },
  httpPort: {
    doc: "The rest port to bind",
    format: "port",
    default: 5432,
    env: "HTTP_PORT",
    sensitive: false,
  },
  grpcPort: {
    doc: "The grpc port to bind",
    format: "port",
    default: 30015,
    env: "GRPC_PORT",
    sensitive: false,
  },
  bodyLimit: {
    doc: "The maximum size of request bodies (json)",
    format: "*",
    default: "20mb",
    env: "BODY_LIMIT",
    sensitive: false,
  },
  apiVersion: {
    doc: "The API version",
    format: "*",
    default: "v1",
    env: "API_VERSION",
    sensitive: false,
  },
  env: {
    doc: "The application environment",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
    sensitive: false,
  },
  allowedOrigins: {
    doc: "Allowed origins for CORS",
    format: "*",
    default: "*",
    env: "ALLOWED_ORIGINS",
    sensitive: false,
  },
};

exports.app = config;
