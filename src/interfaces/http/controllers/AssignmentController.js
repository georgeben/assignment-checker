import fse from "fs-extra";
import InvalidPayloadError from "../errors/InvalidPayloadError";
import BaseController from "./BaseController";

class AssignmentController extends BaseController {
  constructor({ compareAssignments, getPreviousComparisons }) {
    super();
    this.compareAssignments = compareAssignments;
    this.getPreviousComparisons = getPreviousComparisons;
  }

  async compare(req, res) {
    const { files } = req;
    const firstAssignment = files.first_assignment[0];
    if (!firstAssignment) {
      throw new InvalidPayloadError("Please upload file for first assignment");
    }
    const secondAssignment = files.second_assignment[0];
    if (!secondAssignment) {
      throw new InvalidPayloadError("Please upload file for second assignment");
    }
    const payload = {
      firstSubmission: {
        student: req.body.first_student,
        path: firstAssignment.path,
      },
      secondSubmission: {
        student: req.body.second_student,
        path: secondAssignment.path,
      },
    };
    const result = await this.compareAssignments.execute(payload);
    await Promise.all([fse.unlink(firstAssignment.path), fse.unlink(secondAssignment.path)]);
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess({ result }, "Successfully compared submissions.");
  }

  async getHistory(req, res) {
    const history = await this.getPreviousComparisons.execute();
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess({ history }, "Successfully fetched comparison history");
  }
}

export default AssignmentController;
