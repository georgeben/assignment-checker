import HTTP_STATUS from "http-status-codes";
import UseCase from "../../UseCase";

class CreateUser extends UseCase {
  constructor({ User, userRepository, userValidation }) {
    super();
    this.userRepository = userRepository;
    this.userValidation = userValidation;
    this.User = User;
  }

  async execute({ email, password }) {
    const { createUserSchema } = this.userValidation;
    const { error } = createUserSchema.validate(
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
    const existingUser = await this.userRepository.getByEmail(email);
    if (existingUser) {
      const e = new Error("User with email already exists");
      e.name = "ConflictError";
      e.status = HTTP_STATUS.CONFLICT;
      throw e;
    }
    let user = await this.User.create({ email, password });
    user = await this.userRepository.save(user);
    return user;
  }
}

export default CreateUser;
