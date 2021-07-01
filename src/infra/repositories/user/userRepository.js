class UserRepository {
  constructor({ mongoModels }) {
    const { User } = mongoModels;
    this.User = User;
  }

  async save(payload) {
    let user = new this.User({
      _id: payload.id,
      email: payload.email,
      password: payload.password,
    });
    user = await user.save();
    return user.getPublicFields();
  }

  async getByEmail(email) {
    return this.User.findOne({ email });
  }
}

export default UserRepository;
