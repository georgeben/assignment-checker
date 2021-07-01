import { expect } from "chai";
import User from "../User";

describe("******* Assignment Entity ******", () => {
  it("create", async () => {
    const data = {
      email: "hey@email.com",
      password: "secret",
    };
    const user = new User();
    const result = await user.create(data);

    expect(result.email).to.equal(data.email);
    expect(result).to.have.property("id");
    expect(result).to.be.instanceOf(User);
    expect(result.password).to.not.equal(data.password);
  });
});
