import mongoose from "mongoose";
import PasswordHelper from "helpers/Password";

class User {
  async create({
    email,
    password,
  }) {
    const hashedPassword = await PasswordHelper.hashPassword(password);
    const properties = {
      email: {
        value: email,
      },
      password: {
        value: hashedPassword,
      },
      id: {
        value: mongoose.Types.ObjectId(),
      },
    };
    const user = Object.create(User.prototype, properties);
    return user;
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
    };
  }
}

export default User;
