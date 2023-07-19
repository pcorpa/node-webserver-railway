const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/users");
const { fieldValidation } = require("../middlewares/validate-fileds");

const { isRoleValid, emailExist } = require("../helpers/db-validators");

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("email", "Invalid email").isEmail(),
    check("email").custom(emailExist),
    check("firstName", "The name is required").not().isEmpty(),
    check("lastName", "The name is required").not().isEmpty(),
    check("password", "Password must be at least 8 characters long ").isLength({
      min: 8,
    }),
    check("role").custom(isRoleValid),
    fieldValidation,
  ],
  usuariosPost
);
router.put("/:id", usuariosPut);
router.patch("/", usuariosPatch);
router.delete("/", usuariosDelete);

module.exports = router;
