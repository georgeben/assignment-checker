import { Router } from "express";
import { makeInvoker } from "awilix-express";
import UserController from "interfaces/http/controllers/UserController";
import catchErrors from "interfaces/http/middleware/catchErrors";
import MethodNotAllowed from "interfaces/http/middleware/methodNotAllowed";

const router = Router();
const api = makeInvoker(UserController);

router
  .route("/")
  .post(
    catchErrors(api("create")),
  )
  .all(MethodNotAllowed);

router
  .route("/login")
  .post(
    catchErrors(api("login")),
  )
  .all(MethodNotAllowed);

export default router;
