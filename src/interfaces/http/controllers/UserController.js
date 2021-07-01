import BaseController from "./BaseController";

class UserController extends BaseController {
  constructor({ createUser, loginUser }) {
    super();
    this.createUser = createUser;
    this.loginUser = loginUser;
  }

  async create(req, res) {
    const user = await this.createUser.execute(req.body);
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess({ user }, "Successfully created user");
  }

  async login(req, res) {
    const user = await this.loginUser.execute(req.body);
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess({ user }, "Successfully logged in.");
  }
}

export default UserController;
