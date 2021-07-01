import jwt from "jsonwebtoken";
import config from "config";

class Token {
  /**
   * Decodes a JWT and returns it's payload
   * @param {String} token - JWT string to decode
   * @returns {Promise<Object>} A promise that resolves to the JWT payload
   */
  static decodeJWT(token) {
    const jwtSecret = config.get("app.jwtSecret");
    return new Promise((resolve, reject) => {
      jwt.verify(token, jwtSecret, (err, payload) => {
        if (err) {
          reject(err);
        }
        resolve(payload);
      });
    });
  }

  /**
   * Checks if an error is as a result of an invalid JWT
   * @param {Error} error - An error object
   * @returns {Boolean} true if the error is a JWT Error, false otherwise
   */
  static isJWTError(error) {
    const jwtErrors = [
      "TokenExpiredError",
      "JsonWebTokenError",
      "NotBeforeError",
    ];
    return jwtErrors.includes(error.name);
  }
}

export default Token;