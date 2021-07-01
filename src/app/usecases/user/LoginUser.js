import HTTP_STATUS from "http-status-codes";
import PasswordHelper from "helpers/Password";
import jwt from "jsonwebtoken";
import UseCase from "../../UseCase";

class Login extends UseCase {
  constructor({
    User, authValidation, userRepository, config,
  }) {
    super();
    this.User = User;
    this.authValidation = authValidation;
    this.userRepository = userRepository;
    this.config = config;
  }

  generateToken(id) {
    const secret = this.config.get("app.jwtSecret");
    const token = jwt.sign(
      {
        sub: id,
        iat: Date.now(),
      },
      secret,
      { expiresIn: "1d" },
    );
    return token;
  }

  async execute({ email, password }) {
    const { loginSchema } = this.authValidation;
    const { error } = loginSchema.validate(
      { email, password },
      {
        abortEarly: true,
        allowUnknown: false,
      },
    );
    if (error) {
      const e = new Error(error.details[0].message);
      e.name = "ValidationError";
      throw e;
    }
    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      const e = new Error("Invalid email/password");
      e.name = "UnauthorizedError";
      throw e;
    }
    const match = await PasswordHelper.comparePassword(password, user.password);
    if (!match) {
      const e = new Error("Invalid email/password");
      e.name = "UnauthorizedError";
      e.status = HTTP_STATUS.UNAUTHORIZED;
      throw e;
    }
    const token = this.generateToken(user.id);
    delete user.password;
    return {
      user: user.getPublicFields(),
      token,
    };
  }
}

export default Login;
