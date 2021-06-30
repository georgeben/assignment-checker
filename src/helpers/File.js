import fs from "fs";

/**
 * Helpers for file-related operations
 */
class File {
  /**
   * Retrieves the content of a file
   * @param {String} path - File path
   * @returns {String}
   */
  static getContent(path) {
    return new Promise((resolve, reject) => {
      try {
        const data = [];
        fs.createReadStream(path, { encoding: "utf-8" })
          .on("data", (chunk) => data.push(chunk))
          .on("end", () => {
            resolve(data[0]);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default File;
