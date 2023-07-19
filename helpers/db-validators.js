const Role = require("../models/role");
const User = require("../models/user");

const isRoleValid = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`Role ${role} is not registered`);
  }
};

const emailExist = async (email) => {
  await User.findOne({ email });
  if (emailExist) {
    throw new Error(`The email ${email} already exist - FindOne`);
  }
};

module.exports = { isRoleValid, emailExist };
