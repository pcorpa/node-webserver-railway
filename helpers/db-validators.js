const Role = require("../models/role");
const User = require("../models/user");

const isRoleValid = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`Role ${role} is not registered`);
  }
};

const emailExist = async (email) => {
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new Error(`The email ${email} already exist - FindOne`);
  }
};

const userExistById = async (id) => {
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new Error(`Id ${id} doesn't exist`);
  }
};

module.exports = { isRoleValid, emailExist, userExistById };
