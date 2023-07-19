const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const userGet = (req = request, res = response) => {
  const { q, firstName = "No name", lastName = "No name" } = req.query;
  res.json({ msg: "get API - controller", q, firstName, lastName });
};

const userGetMany = async (req = request, res = response) => {
  // const { q, firstName = "No name", lastName = "No name" } = req.query;
  const { limit = 5, from = 0 } = req.query;
  const query = { deleted: false };

  // const users = await User.find(query).skip(Number(from)).limit(Number(limit));
  // const totalUsersFromGet = await User.countDocuments(query);

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({ total, users });
};

const userPost = async (req, res = response) => {
  const { firstName, lastName, email, password, role } = req.body;
  const user = new User({ firstName, lastName, email, password, role });

  //Password encryptation
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  //Save user in db
  user.save();

  res.json({ user });
};

const userPut = async (req, res = response) => {
  const { id } = req.params;
  const { password, email, googleSignIn, deleted, _id, ...rest } = req.body;

  if (password) {
    //Password encryptation
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, rest);

  res.json({ msg: "put API - controller", id });
};

const userPatch = (req, res = response) => {
  res.json({ msg: "patch API - controller" });
};

const userDelete = async (req, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { deleted: true });

  res.json(user);
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
  userGetMany,
};
