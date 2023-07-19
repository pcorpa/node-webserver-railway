const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  firstName: {
    type: String,
    required: [true, "The name is required"],
  },
  lastName: {
    type: String,
    required: [true, "The name is required"],
  },
  email: {
    type: String,
    required: [true, "The email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "The password is required"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: [true, "The role is required"],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  googleSignIn: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model("User", UserSchema);
