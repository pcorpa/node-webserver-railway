const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const usuariosGet = (req = request, res = response) => {
  const { q, firstName = "No name", lastName = "No name" } = req.query;
  res.json({ msg: "get API - controller", q, firstName, lastName });
};
const usuariosPost = async (req, res = response) => {
  const { firstName, lastName, email, password, role } = req.body;
  const user = new User({ firstName, lastName, email, password, role });

  //Password encryptation
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  //Save user in db
  user.save();

  res.json({ user });
};
const usuariosPut = (req, res = response) => {
  const { id } = req.params;
  res.json({ msg: "put API - controller", id });
};
const usuariosPatch = (req, res = response) => {
  res.json({ msg: "patch API - controller" });
};
const usuariosDelete = (req, res = response) => {
  res.json({ msg: "delete API - controller" });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
