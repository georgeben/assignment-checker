import { Router } from "express";
import { makeInvoker } from "awilix-express";
import AssignmentController from "interfaces/http/controllers/AssignmentController";
import catchErrors from "interfaces/http/middleware/catchErrors";
import MethodNotAllowed from "interfaces/http/middleware/methodNotAllowed";
import { multiUpload } from "interfaces/http/middleware/fileUploader";

const router = Router();
const api = makeInvoker(AssignmentController);

router
  .route("/")
  .get(
    catchErrors(api("get")),
  )
  .all(MethodNotAllowed);

router
  .route("/compare")
  .post(
    multiUpload({
      fields: [
        { name: "first_assignment", maxCount: 1 },
        { name: "second_assignment", maxCount: 1 },
      ],
    }),
    catchErrors(api("compare")),
  )
  .all(MethodNotAllowed);

export default router;
