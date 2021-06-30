/**
 * Error handling middleware
*/
import HttpStatus from "http-status-codes";
import ResponseBuilder from "../response/ResponseBuilder";

// eslint-disable-next-line no-unused-vars
export default async (err, req, res, next) => {
  if (err.status && err.status >= 500) {
    console.error("---------------START OF ERROR(S)---------------------");
    console.error("An error occurred for request", err);
    console.error("---------------END OF ERROR(S)-----------------------");
  }

  if (err.name || err.error) {
    if (
      err.name === "ValidationError"
    ) {
      return ResponseBuilder.getResponseHandler(res).onError(
        err.name,
        HttpStatus.BAD_REQUEST,
        err.message || err.message,
      );
    }
    return ResponseBuilder.getResponseHandler(res).onError(
      err.name,
      err.status,
      err.message,
      err.data,
    );
  }
  const errorMessage = process.env.NODE_ENV === "production"
    ? "Something bad happened!"
    : err.message;
  const errorData = process.env.NODE_ENV === "production" ? {} : err;
  return ResponseBuilder.getResponseHandler(res).onError(
    "InternalServerError",
    err.status || HttpStatus.INTERNAL_SERVER_ERROR,
    errorMessage,
    errorData,
  );
};
