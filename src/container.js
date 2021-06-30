import {
  createContainer, asClass, InjectionMode, Lifetime, asFunction, asValue,
} from "awilix";
import { scopePerRequest } from "awilix-express";
import config from "infra/config";
import database from "infra/database";
import mongodbModels from "infra/database/mongo/models";
import log from "infra/logger";
import routes from "interfaces/http/routes/router";
import httpServer from "interfaces/http/Server";

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  config: asValue(config),
  db: asValue(database()),
  mongoModels: asValue(mongodbModels),
  log: asValue(log),
  containerMiddleware: asValue(scopePerRequest(container)),
  routes: asFunction(routes),
  httpServer: asClass(httpServer),
});

container.loadModules(
  [
    [
      "app/!(validations)/**/*!(index.js).js",
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
    [
      "app/validations/*!(index.js).js",
      {
        lifetime: Lifetime.SCOPED,
        register: asFunction,
      },
    ],
    [
      "infra/repositories/**/*.js",
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
  ],
  {
    formatName: "camelCase",
    resolverOptions: {},
    cwd: __dirname,
  },
);

container.loadModules(
  [
    [
      "domain/entities/*!(index.js).js",
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
    [
      "infra/database/*!(index.js).js",
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
  ],
  {
    resolverOptions: {},
    cwd: __dirname,
  },
);

export default container;
