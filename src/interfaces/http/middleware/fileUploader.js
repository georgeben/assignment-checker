/**
 * @module lib/uploader
 * @description Parses a multipart form and uploads the specified files to disk
 */
import multer from "multer";
import { MAX_UPLOAD_SIZE, ONE_MB } from "common/constants";
import InvalidPayloadError from "../errors/InvalidPayloadError";

const diskStorage = multer.diskStorage({
  destination: "temp/uploads",
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});

export const multiUpload = ({ fields }) => function (req, res, next) {
  const uploadMiddleware = multer({
    storage: diskStorage,
    fileFilter: (_req, file, cb) => {
      if (file.mimetype === "text/plain") {
        cb(null, true);
      } else {
        cb(new InvalidPayloadError("Only text files are allowed"));
      }
    },
    limits: {
      fileSize: MAX_UPLOAD_SIZE,
    },
  }).fields(fields);
  uploadMiddleware(req, res, (error) => {
    if (error) {
      const message = `Upload error: ${error.message}.`;
      switch (error.code) {
        case "LIMIT_FILE_SIZE": {
          const uploadLimitInMB = (MAX_UPLOAD_SIZE / ONE_MB).toFixed(2);
          return next(
            new InvalidPayloadError(
              `${message} Only files smaller than ${MAX_UPLOAD_SIZE} bytes (${uploadLimitInMB}MB) are allowed`,
            ),
          );
        }
        case "LIMIT_UNEXPECTED_FILE":
          return next(
            new InvalidPayloadError(
              `${message} Document should be uploaded using '${fields.map((el) => el.name)}' fields`,
            ),
          );
        default:
          return next(new InvalidPayloadError(message));
      }
    }
    return next();
  });
};
