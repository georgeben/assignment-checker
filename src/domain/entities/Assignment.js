import { v4 as uuid } from "uuid";

/**
 * @typedef {Object} Assignment
 * @property {String} id - ID of assignment
 * @property {String} student - Name of student
 * @property {String} content - Content of assignment/essay
 */

class Assignment {
  /**
   * Creates an assignment
   * @param {Object} payload
   * @param {String} payload.student - Name of student
   * @param {String} payload.content - Content of assignment/essay
   * @returns {Assignment}
   */
  create({ student, content }) {
    const properties = {
      student: {
        value: student,
      },
      content: {
        value: content,
      },
      id: {
        value: uuid(),
      },
    };
    const assignment = Object.create(Assignment.prototype, properties);
    return assignment;
  }

  toJSON() {
    return {
      id: this.id,
      student: this.student,
      content: this.content,
    };
  }
}

export default Assignment;
