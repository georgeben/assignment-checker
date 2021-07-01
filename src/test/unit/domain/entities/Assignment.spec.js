import { expect } from "chai";
import Assignment from "domain/entities/Assignment";

describe("******* Assignment Entity ******", () => {
  it("create", () => {
    const data = {
      student: "John",
      content: "This is my assignment",
    };
    const assignment = new Assignment();
    const result = assignment.create(data);
    expect(result.student).to.equal(data.student);
    expect(result).to.be.instanceOf(Assignment);
    expect(result.content).to.equal(data.content);
  });
});
